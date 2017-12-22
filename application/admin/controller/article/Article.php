<?php

namespace app\admin\controller\article;

use app\common\controller\Backend;
use app\common\model\Category as CategoryModel;
use fast\Tree;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Article extends Backend
{
    
    protected $categorylist = [];
    
    /**
     * Article模型对象
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Article');
        $this->view->assign("statusList", $this->model->getStatusList());
        
        //$this->request->filter(['strip_tags']);
        
        $tree = Tree::instance();
        //贷款类型不需要添加文章，这里过滤处理
        $tree->init(collection(model('Category')->order('weigh desc,id desc')->whereIn('type', ['loan_strategy', 'media', 'dynamic'])->select())->toArray(), 'pid');
        $this->categorylist = $tree->getTreeList($tree->getTreeArray(0), 'name');
        $categorydata = [0 => ['type' => 'all', 'name' => __('None')]];
        foreach ($this->categorylist as $k => $v)
        {
            $categorydata[$v['id']] = $v;
        }
        
        //贷款类型不需要添加文章，这里过滤处理
        $typeList = CategoryModel::getTypeList();
        if (!empty($typeList))
        {
            foreach ($typeList as $k => $v)
            {
                if (!in_array($k, ['loan_strategy', 'dynamic', 'media', 'default'])) 
                {
                    unset($typeList[$k]);
                    continue;
                }
            }
        }
        
        $this->view->assign("typeList", $typeList);
        $this->view->assign("parentList", $categorydata);
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
     * 添加
     */
    public function add()
    {
        if ($this->request->isPost())
        {
            $params = $this->request->post("row/a");
            if ($params)
            {
                $params['author'] = $this->auth->username;
                
                if ($this->dataLimit)
                {
                    $params[$this->dataLimitField] = $this->auth->id;
                }
                try
                {
                    //是否采用模型验证
                    if ($this->modelValidate)
                    {
                        $name = basename(str_replace('\\', '/', get_class($this->model)));
                        $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : true) : $this->modelValidate;
                        $this->model->validate($validate);
                    }
                    
                    //简单粗暴的写法
                    if ($params['category_id'] == 0) {
                        $this->error('请选择分类');
                    }
                    
                    $result = $this->model->allowField(true)->save($params);
                    if ($result !== false)
                    {
                        $this->success();
                    }
                    else
                    {
                        $this->error($this->model->getError());
                    }
                }
                catch (\think\exception\PDOException $e)
                {
                    $this->error($e->getMessage());
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        return $this->view->fetch();
    }
}