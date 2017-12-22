<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\common\model\Category;
use think\Db;

class Index extends Frontend
{

    protected $ad = 'index_carousel_figure';
    
    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        //信用贷
        $credit_loan = Category::getCategoryArray('credit_loan', 'normal', 'asc', 'id,pid,type,name', 0, 8);
        if (!empty($credit_loan)) {
            foreach ($credit_loan as &$v) {
                $cate_info = Category::get($v['id']);
                $v['loan_art'] = collection($cate_info->loans()->where('status', 1)->field('id,title,picurl,create_time,publish_time')->limit(5)->order('publish_time desc')->select())->toArray();
            }
        }
        $this->assign('credit_loan', $credit_loan);
        
        //抵押贷
        $mortgage_loan = Db::name('category')->whereIn('type', ['house_loan', 'car_loan'])->where('status', 'normal')->order('weigh asc')->field('id,pid,type,name')->limit(8)->select();
        if (!empty($mortgage_loan)) {
            foreach ($mortgage_loan as &$v) {
                $cate_info = Category::get($v['id']);
                $v['loan_art'] = collection($cate_info->loans()->where('status', 1)->field('id,title,picurl,create_time,publish_time')->limit(4)->order('publish_time desc')->select())->toArray();
            }
        }
        $this->assign('mortgage_loan', $mortgage_loan);
        
        //贷款攻略
        $strategy = Category::getCategoryArray('loan_strategy', 'normal', 'asc', 'id,pid,type,name', 0, 10);
        if (!empty($strategy)) {
            foreach ($strategy as &$strategy_cinfo) {
                $cate_info = Category::get($strategy_cinfo['id']);
                $strategy_cinfo['art_info'] = collection($cate_info->articles()->where('status', 'normal')->field('id,thumb,title,content,status,createtime')->limit(9)->order('createtime desc')->select())->toArray();
            }
        }
        $this->assign('strategy_list', $strategy);
        
        //贷款问答
        $wd_list = Db::name('question')->where('status', 'normal')->order('weigh desc, create_time desc')->limit(7)->column('id,title');
        $this->assign('wd_list', $wd_list);
        
        //媒体报道
        $media_list = Db::name('article')->where('type', 'media')->field('id,thumb,title,content')->limit(2)->order('createtime desc')->select();
        $this->view->assign('media_list', $media_list);
        return $this->view->fetch();
    }
    
    public function map()
    {
        $list = Db::name('category')->where('type', 'loan_strategy')->column('id,name');
        $this->view->assign('list', $list);
        return $this->view->fetch();
    }
    
    public function adviser($id = null)
    {
        if (!$id) 
        {
            $this->error('错误');
        }
        $this->view->assign('uid', $id);
        return $this->view->fetch();
    }
    
    public function calculate($type = null)
    {
        if (!in_array($type, range(1, 4))) {
            $this->error('访问页面不存在');
        }
        
        switch ($type)
        {
            case 1:
                $view = 'business';
                break;
            case 2:
                $view = 'advance';
                break;
            case 3:
                $view = 'mortgage';
                break;
            case 4:
                $view = 'personal';
                break;
        }
        
        $this->view->assign('type', $type);
        return $this->view->fetch($view);
    }
}