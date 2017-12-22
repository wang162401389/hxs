<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use app\admin\model\AuthGroup;
use fast\Tree;
use think\Controller;
use think\Request;
use app\admin\model\Apply as ApplyModel;
use app\admin\model\Admin;

/**
 * 用户申请列管理
 *
 * @icon fa fa-circle-o
 */
class Apply extends Backend
{
    //当前登录管理员所有子组别
    protected $childrenGroupIds = [];
    //当前组别列表数据
    protected $groupdata = [];
    protected $noNeedRight = ['namelist'];
    
    /**
     * Apply模型对象
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Apply');
        $this->assignconfig("isSuperAdmin", $this->auth->isSuperAdmin());
    }
    
    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个方法
     * 因此在当前控制器中可不用编写增删改查的代码,如果需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    
    /**
     * 查看
     */
    public function index()
    {
        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax())
        {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('pkey_name'))
            {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            
            $map = [];
            $order = 'id desc';
            if ($this->auth->isSuperAdmin() === false)
            {
                $map['follow_up'] = $this->auth->id;
                $order = 'remark_by_super desc, id desc';
            }
            
            $total = $this->model
                    ->where($where)
                    ->where($map)
                    ->order($order)
                    ->count();
            
            $list = $this->model
                    ->where($where)
                    ->where($map)
                    ->order($order)
                    ->limit($offset, $limit)
                    ->select();
                    
            if (!empty($list)) {
                foreach ($list as &$v) {
                    $v['click_detail_flag'] = 1;
                    if (!$this->auth->isSuperAdmin()) 
                    {
                        //一对多根据关联条件查询
                        $count = ApplyModel::has('applyremark', ['apply_id' => $v['id']])->count();
                        $v['click_detail_flag'] = $count > 0 ? 1 : 0;
                    }
                }
            }
                    
            return json(["total" => $total, "rows" => $list]);
        }
        
        return $this->view->fetch();
    }
    
    /**
     * 详情
     */
    public function detail($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row)
        {
            $this->error(__('No Results were found'));
        }
        
        $this->view->assign("row", $row->toArray());
        
        $remarks = \think\db::name('apply_remark')->where('apply_id', $ids)->field('author,content,create_time')->order('id desc')->select();
        $this->view->assign('list', $remarks);
        return $this->view->fetch();
    }
    
    /**
     * 编辑
     */
    public function edit($ids = NULL)
    {
        $row = $this->model->get($ids);
        if (!$row)
        {
            $this->error(__('No Results were found'));
        }
            
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds))
        {
            if (!in_array($row[$this->dataLimitField], $adminIds))
            {
                $this->error(__('You have no permission'));
            }
        }
        if ($this->request->isPost())
        {
            $params = $this->request->post("row/a");
            if ($params)
            {
                try
                {
                    if (isset($params['status'])) {
                        //状态
                        if ($params['status'] == 2 && $row['loan_id'] > 0) {
                            \think\db::name('loan')->where('id', $row['loan_id'])->setInc('success_apply_count');
                        }
                        \think\db::name('apply')->where('id', $ids)->update(['status' => $params['status'], 'remark_by_super' => $this->auth->isSuperAdmin() ? 1 : 0]);
                    }
                    
                    //添加到回复表
                    $apply = ApplyModel::find($ids);
                    //增加一个关联数据
                    $data = [
                        'content' => $params['content'],
                        'author' => $this->auth->username
                    ];
                    $apply->applyremark()->save($data);
                    
                    $this->success();
                    
                }
                catch (\think\exception\PDOException $e)
                {
                    $this->error($e->getMessage());
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $info = $row->toArray();
        $info['status_val'] = $row->getData('status');
        $this->view->assign("row", $info);
        return $this->view->fetch();
    }
    
    /**
     * 分配 
     */
    public function distribute($ids = null)
    {
        $ids_arr = explode(',', $ids);
//         if (!empty($ids_arr)) {
//             foreach ($ids_arr as $id) {
//                 $row = $this->model->get($id);
//                 if ($row->getData('follow_up') > 0) {
//                     $this->error('已经分配过了');
//                 }
//             }
//         }
        
        if ($this->request->isPost())
        {
            if (!empty($this->request->post('aid'))) 
            {
                foreach ($ids_arr as $id) 
                {
                    $dis_data = [];
                    $dis_data['follow_up'] = $this->request->post('aid');
                    $dis_data['distribution_status'] = 1;
                    $dis_data['distribution_time'] = $_SERVER['REQUEST_TIME'];
                    $result = $this->model->where('id', $id)->update($dis_data);
                    if ($result === false)
                    {
                        $this->error($this->model->getError());
                    }
                }
                $this->success();
            }
            else 
            {
                $this->error('请选择管理员');
            }
        }
        
        $this->childrenGroupIds = $this->auth->getChildrenGroupIds(true);
        $groupList = collection(AuthGroup::where('id', 'in', $this->childrenGroupIds)->select())->toArray();
        $groupIds = $this->auth->getGroupIds();
        Tree::instance()->init($groupList);
        $result = [];
        if ($this->auth->isSuperAdmin())
        {
            $result = Tree::instance()->getTreeList(Tree::instance()->getTreeArray(0));
        }
        else
        {
            foreach ($groupIds as $m => $n)
            {
                $result = array_merge($result, Tree::instance()->getTreeList(Tree::instance()->getTreeArray($n)));
            }
        }
        $groupName[0] = __('None');
        foreach ($result as $k => $v)
        {
            $groupName[$v['id']] = $v['name'];
        }
        $this->groupdata = $groupName;
        $this->view->assign('groupdata', $this->groupdata);
        
        return $this->view->fetch();
    }
    
    /**
     * 获取角色组管理员id
     */
    public function getAdminIds()
    {
        $gid = $this->request->post("gid");
        if($gid < 0)
        {
            $this->error(__('Group not found'));
        }

        $ids_info = collection(model('AuthGroupAccess')->where(['group_id' => $gid])->select())->toArray();
        $ids_arr = array_column($ids_info, 'uid');
        $adminids = collection(model('Admin')->where('id', 'in', $ids_arr)->column('id,username'))->toArray();
        $this->success('', null, $adminids);
    }
    
    /**
     * 跟进人下拉列表
     */
    public function namelist()
    {
        if ($this->auth->isSuperAdmin() === true) 
        {
            $result = \think\db::name('apply')->where('follow_up', '>', 0)->group('follow_up')->field('follow_up')->select();
            if (!empty($result)) {
                $uid_arr = array_column($result, 'follow_up');
                $searchlist = [];
                foreach ($uid_arr as $uid)
                {
                    $uname = Admin::withTrashed()->find($uid);
                    if ($uname) {
                        $searchlist[] = ['id' => $uid, 'name' => $uname['username']];
                    }
                }
            }
        }
        else 
        {
            $searchlist[] = ['id' => $this->auth->id, 'name' => $this->auth->username];
        }
        
        $this->success('', null, ['searchlist' => $searchlist]);
    }
}