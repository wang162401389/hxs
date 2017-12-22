<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\admin\model\Article;
use app\common\model\Category;
use think\Db;

class Strategy extends Frontend
{
    protected $ad = 'strategy_index_figure';
    
    public function _initialize()
    {
        parent::_initialize();
    }
    
    public function index()
    {
        $strategy = Category::getCategoryArray('loan_strategy', 'normal', 'asc', 'id,pid,type,name', 0);
        if (!empty($strategy)) {
            foreach ($strategy as &$strategy_cinfo) {
                $cate_info = Category::get($strategy_cinfo['id']);
                $strategy_cinfo['art_info'] = collection($cate_info->articles()->where('status', 'normal')->field('id,thumb,title,content,status,createtime')->limit(3)->order('createtime desc')->select())->toArray();
            }
        }
        $this->assign('strategy_list', $strategy);
        
        $bottom_pic = $this->loadad('strategy_index_bottom');
        $this->view->assign('botttom_pic', $bottom_pic);
        
        return $this->view->fetch();
    }
    
    public function detail($id = NULL)
    {
        $row = Db::name('article')->where(['id' => $id])->find();
        if (!$row || $row['type'] != 'loan_strategy')
        {
            $this->error('没有找到记录');
        }
        
        $cate_info = Article::with(['category' => ['name']])->find($id);
        $this->view->assign("row", $cate_info);
        
        //下一篇
        $next = $this->getNext($id, $row['category_id']);
        $data['next_url'] = !empty($next['id']) ? url('index/Strategy/detail', ['id' => $next['id']]) : '';
        $data['next_name'] = !empty($next['id']) ? $next['title'] : '';
        
        //上一篇
        $prev = $this->getPrev($id, $row['category_id']);
        $data['prev_url'] = !empty($prev['id']) ? url('index/Strategy/detail', ['id' => $prev['id']]) : '';
        $data['prev_name'] = !empty($prev['id']) ? $prev['title'] : '';
        
        $this->view->assign('prev_next_show', $data);
        return $this->view->fetch();
    }
    
    /**
     * 获取上一条信息
     *
     * @params $article_id int 当前ID
     * @return array
     */
    public static function getPrev($article_id, $category_id)
    {
        return Db::name('article')->where('id', '<', $article_id)->where('status', 'normal')->where('category_id', $category_id)->order('id desc')->find();
    }
    
    /**
     * 获取下一条信息
     *
     * @params $article_id int 当前ID
     * @return array
     */
    public static function getNext($article_id, $category_id)
    {
        return Db::name('article')->where('id', '>', $article_id)->where('status', 'normal')->where('category_id', $category_id)->order('id asc')->find();
    }
    
    public function lists($id = NULL)
    {
        $row = Db::name('category')->where(['id' => $id])->field('id,name,type')->find();
        $this->assign('row', $row);
        
        if ($this->request->isAjax() && $this->request->isPost())
        {
            $params = $this->request->post();
            $page = isset($params['page']) ? $params['page'] : 1;
            $cid = $params['cid'];
            $this->code = 0;
            $this->msg = '分类id必须存在';
            if (isset($cid)) 
            {
                $row = Db::name('category')->where(['id' => $cid])->field('name,type')->find();
                $this->code = 0;
                $this->msg = '没有找到记录';
                if ($row && $row['type'] == 'loan_strategy') {
                    $map['category_id'] = $cid;
                    $map['status'] = 'normal';
                    
                    $count = Db::name('article')->where($map)->count();
                    
                    $list = Db::name('article')
                            ->where($map)
                            ->field('id,title,createtime')
                            ->limit(config('paginate.list_rows'))
                            ->page($page)
                            ->order('createtime desc')
                            ->select();
                    
                    $this->code = 1;
                    $this->msg = '获取成功';
                    $this->data = ['total' => $count, 'row' => $list];
                }
            }
        }
        
        $bottom_pic = $this->loadad('strategy_list_bottom');
        $this->view->assign('botttom_pic', $bottom_pic);
        
        return $this->view->fetch();
    }
}