<?php

namespace app\admin\controller\article;

use app\common\controller\Backend;
use app\common\model\Category as CategoryModel;
use fast\Tree;

/**
 * 分类管理
 *
 * @icon fa fa-list
 * @remark 用于统一管理网站的所有分类,分类可进行无限级分类
 */
class Category extends Backend
{

    protected $model = null;
    protected $categorylist = [];
    protected $noNeedRight = ['selectpage'];

    public function _initialize()
    {
        parent::_initialize();
        $this->request->filter(['strip_tags']);
        $this->model = model('Category');

        $tree = Tree::instance();
        $tree->init(collection($this->model->whereNotIn('type', ['house_loan', 'car_loan'])->order('weigh desc,id desc')->select())->toArray(), 'pid');
        $this->categorylist = $tree->getTreeList($tree->getTreeArray(0), 'name');
        
        $categorydata = [0 => ['type' => 'all', 'name' => __('None')]];
        foreach ($this->categorylist as $k => $v)
        {
            $categorydata[$v['id']] = $v;
        }
        
        $typelist = CategoryModel::getTypeList();
        //房抵贷、车抵贷不支持下级分类，否则会出现问题
        unset($typelist['house_loan'], $typelist['car_loan']);
        
        $this->view->assign("typeList", $typelist);
        $this->view->assign("parentList", $categorydata);
    }

    /**
     * 查看
     */
    public function index()
    {
        if ($this->request->isAjax())
        {
            $search = $this->request->request("search");
            //构造父类select列表选项数据
            $list = [];
            if ($search)
            {
                foreach ($this->categorylist as $k => $v)
                {
                    if (stripos($v['name'], $search) !== false || stripos($v['nickname'], $search) !== false)
                    {
                        $list[] = $v;
                    }
                }
            }
            else
            {
                $list = $this->categorylist;
            }
            $total = count($list);
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }
    
    /**
     * 分配
     */
    public function distribute()
    {
        if ($this->request->isPost())
        {
            $param = $this->request->param();
            foreach ($param as $k => $v) {
                if ($k == 'dialog') {
                    continue;
                }
                
                $result = \think\Db::name('category_setting')->where('name', $k)->update(['value' => $v]);
                if ($result === false)
                {
                    $this->error($this->model->getError());
                }
            }
            
            $this->success();
        }
        
        $category_list = $this->model->where('type', 'loan_strategy')->column('id,name');
        $this->view->assign('category_list', $category_list);
        
        $result = \think\Db::name('category_setting')->select();
        $this->view->assign('list', $result);
        
        return $this->view->fetch();
    }

    /**
     * Selectpage搜索
     * 
     * @internal
     */
    public function selectpage()
    {
        return parent::selectpage();
    }
}