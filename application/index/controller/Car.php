<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\admin\model\Loan;
use app\common\model\Category;
use app\admin\model\Article;

class Car extends Frontend
{
    
    protected $ad = 'car_loan_index_figure';
    
    public function _initialize()
    {
        parent::_initialize();
    }
    
    public function index()
    {
        $list = Loan::with('category')->where('category.type', 'car_loan')->limit(5)->select();
        $this->view->assign('list', $list);
        
        $article_list = [];
        $cat_id = \think\Db::name('category_setting')->where('name', 'show_in_car_index')->value('value');
        if ($cat_id > 0)
        {
            $cat_name = Category::get($cat_id);
            $this->view->assign('mod_name', $cat_name->name);
            
            $article_list = Article::with('category')->where('category.id', $cat_id)->where('article.status', 'normal')->limit(9)->select();
        }
        $this->view->assign('cat_id', $cat_id);
        $this->view->assign('article_list', $article_list);
        
        $bottom_pic = $this->loadad('car_index_bottom');
        $this->view->assign('botttom_pic', $bottom_pic);
        
        return $this->view->fetch();
    }
    
    public function more()
    {
        if ($this->request->isAjax() && $this->request->isPost())
        {
            $params = $this->request->post();
            $page = isset($params['page']) ? $params['page'] : 1;
            $count = Loan::with('category')->where('category.type', 'car_loan')->count();
            
            $this->code = 0;
            if ($count) {
                $list = Loan::with('category')->where('category.type', 'car_loan')->limit(config('paginate.list_rows'))->page($page)->order('create_time desc')->select();
                
                $this->code = 1;
                $this->msg = '获取成功';
                $this->data = ['total' => $count, 'row' => collection($list)->toArray()];
            }
        }
        
        $bottom_pic = $this->loadad('car_loan_more');
        $this->view->assign('botttom_pic', $bottom_pic);
        
        return $this->view->fetch();
    }
    
    /**
     * 车抵贷详情
     */
    public function detail($id = NULL)
    {
        $row = \think\Db::name('loan')->where(['id' => $id])->find();
        $cat_arr = Category::getCategoryArray('car_loan', 'normal', null, 'id,type');
        $cid_arr = array_column($cat_arr, 'id');
        if (!$row || (!empty($cid_arr) && !in_array($row['type'], $cid_arr)))
        {
            $this->error('没有找到记录');
        }
        
        $this->view->assign('id', $id);
        $cate_info = Loan::with(['category' => ['name']])->find($id);
        
        $article_list = [];
        $cat_id = \think\Db::name('category_setting')->where('name', 'show_in_car_detail')->value('value');
        if ($cat_id > 0)
        {
            $cat_name = Category::get($cat_id);
            $this->view->assign('mod_name', $cat_name->name);
            
            $article_list = Article::with('category')->where('category.id', $cat_id)->where('article.status', 'normal')->order('article.createtime desc')->limit(9)->select();
        }
        $this->view->assign('cat_id', $cat_id);
        $this->view->assign('article_list', $article_list);
        
        $this->view->assign("row", $cate_info);
        
        return $this->view->fetch();
    }
}