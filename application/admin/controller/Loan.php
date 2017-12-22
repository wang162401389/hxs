<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use fast\Tree;
use think\Controller;

/**
 * 贷款项目
 *
 * @icon fa fa-circle-o
 */
class Loan extends Backend
{
    
    protected $modelValidate = true;
    
    /**
     * Loan模型对象
     */
    protected $model = null;
    protected $categorylist = [];
    protected $categorydata = [];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Loan');
        
        $tree = Tree::instance();
        $tree->init(collection(model('Category')->field('id,pid,type,name')->order('weigh desc,id desc')->whereIn('type', ['credit_loan','house_loan','car_loan'])->select())->toArray(), 'pid');
        $this->categorylist = $tree->getTreeList($tree->getTreeArray(0), 'name');
        
        foreach ($this->categorylist as $k => $v)
        {
            $this->categorydata[$v['id']] = $v;
            $this->categorydata[$v['id']]['selected'] = !empty($tree->getChildren($v['id'])) ? 0 : 1;
        }
        
        $site_config = config('site');
        $this->view->assign('typedata', $this->categorydata);
        $this->view->assign('repaymenttypedata', $this->model->getRepaymentTypeList());
        $this->view->assign('deadlinedata', $site_config['deadline_type']);
        $this->view->assign('limitdata', $site_config['limit_type']);
        $this->view->assign('professiondata', $site_config['profession']);
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
            $this->relationSearch = TRUE;
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('pkey_name'))
            {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            
            $total = $this->model
                    ->with('category')
                    ->where($where)
                    ->order($sort, $order)
                    ->count();
            $list = $this->model
                    ->with('category')
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();
            
            $result = array("total" => $total, "rows" => $list);
            
            return json($result);
        }
        return $this->view->fetch();
    }
    
    /**
     * 搜索下拉列表
     */
    public function searchlist()
    {
        $result = \think\db::name('category')->whereIn('type', ['credit_loan', 'house_loan', 'car_loan'])->column('name,id');
        $searchlist = [];
        if (!empty($result)) 
        {
            foreach ($result as $cname => $cid)
            {
                $searchlist[] = ['id' => $cname, 'name' => $cname];
            }
        }
        
        $this->success('', null, ['searchlist' => $searchlist]);
    }
    
    /**
     * 发布
     */
    public function publish($ids = "")
    {
        if ($ids)
        {
            $pk = $this->model->getPk();
            $adminIds = $this->getDataLimitAdminIds();
            if (is_array($adminIds))
            {
                $this->model->where($this->dataLimitField, 'in', $adminIds);
            }
            
            $info = $this->model->get($ids);
            if ($info->getData('status') == 1) {
                $this->error('请不要重复发布！');
            }
            
            $info->status = 1;
            $info->publish_time = $_SERVER['REQUEST_TIME'];
            
            if ($info->save())
            {
                $this->success();
            }
            else
            {
                $this->error('发布失败');
            }
        }
        
        $this->error(__('Parameter %s can not be empty', 'ids'));
    }
    
    /**
     * 下架
     */
    public function offline($ids = "")
    {
        if ($ids)
        {
            $pk = $this->model->getPk();
            $adminIds = $this->getDataLimitAdminIds();
            if (is_array($adminIds))
            {
                $this->model->where($this->dataLimitField, 'in', $adminIds);
            }
            
            $info = $this->model->get($ids);
            if ($info->getData('status') == 0) {
                $this->error('已经下架了！');
            }
            
            $info->status = 0;
            $info->publish_time = 0;
            
            if ($info->save())
            {
                $this->success();
            }
            else
            {
                $this->error('下架失败');
            }
        }
        
        $this->error(__('Parameter %s can not be empty', 'ids'));
    }
    
    /**
     * 详情
     */
    public function detail($ids)
    {
        $info = $this->model->get(['id' => $ids])->toArray();
        if (!$info){
            $this->error(__('No Results were found'));
        }
        
        $site_config = config('site');
        $info['type'] = \think\db::name('category')->where('id', $info['type'])->value('name');
        $info['limit'] = $site_config['limit_type'][$info['limit']];
        $info['deadline'] = $site_config['deadline_type'][$info['deadline']];
        $info['repayment_type'] = $this->model->getRepaymentTypeList()[$info['repayment_type']];
        $info['profession'] = $site_config['profession'][$info['profession']];
        unset($info['create_time'], $info['publish_time']);

        $this->view->assign("row", $info);
        return $this->view->fetch();
    }
}