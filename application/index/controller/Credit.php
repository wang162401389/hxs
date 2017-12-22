<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\admin\model\Loan;
use app\common\model\Category;
use app\admin\model\Article;

class Credit extends Frontend
{
    public function _initialize()
    {
        parent::_initialize();
    }
    
    public function index()
    {
        $type_list = \think\Db::name('category')->where('type', 'credit_loan')->column('id,name');
        $this->view->assign('type_list', $type_list);
        
        if ($this->request->isAjax() && $this->request->isPost())
        {
            $params = $this->request->post();
            $page = isset($params['page']) ? $params['page'] : 1;
            $map['status'] = 1;
            $map['type'] = ['in', array_keys($type_list)];
            
            //贷款金额
            if ($params['limit'] != '')
            {
                $map['limit'] = $params['limit'];
            }
            
            //贷款期限
            if ($params['deadline'] != '')
            {
                $map['deadline'] = $params['deadline'];
            }
            
            //贷款类型
            if ($params['type'] != '')
            {
                $map['type'] = $params['type'];
            }
            
            //职业身份
            if ($params['profession'] != '')
            {
                $map['profession'] = $params['profession'];
            }
            
            $order = [];
            if ($params['limit_order'] != '' || $params['deadline_order'] != '') {
                if ($params['limit_order'] != '') {
                    $order['limit'] = $params['limit_order'];
                }
                if ($params['deadline_order'] != '') {
                    $order['deadline'] = $params['deadline_order'];
                }
            }
            
            $count = \think\Db::name('loan')->where($map)->count();
            
            $this->code = 0;
            if ($count) {
                $order = empty($order) ? 'create_time desc' : $order;
                $list = \think\Db::name('loan')->where($map)->limit(config('paginate.list_rows'))->page($page)->order($order)->select();
                
                $limit_cfg = config('site.limit_type');
                $deadline_cfg = config('site.deadline_type');
                foreach ($list as &$v) 
                {
                    $v['deadline_text'] = $deadline_cfg[$v['deadline']];
                    $v['limit_text'] = $limit_cfg[$v['limit']];
                }

                $this->code = 1;
                $this->msg = '获取成功';
                $this->data = ['total' => $count, 'row' => $list];
            }
        }
        
        $this->view->assign('total', \think\Db::name('loan')->count());
        
        $bottom_pic = $this->loadad('credit_index_bottom');
        $this->view->assign('botttom_pic', $bottom_pic);
        
        return $this->view->fetch();
    }
    
    /**
     * 信用贷详情
     */
    public function detail($id = NULL)
    {
        $row = \think\Db::name('loan')->where(['id' => $id])->find();
        $cat_arr = Category::getCategoryArray('credit_loan', 'normal', null, 'id,type');
        $cid_arr = array_column($cat_arr, 'id');
        if (!$row || (!empty($cid_arr) && !in_array($row['type'], $cid_arr)))
        {
            $this->error('没有找到记录');
        }

        $this->view->assign('id', $id);
        $cate_info = Loan::with(['category' => ['name']])->find($id);
        
        //右侧显示的贷款攻略
        $article_list = [];
        $cat_id = \think\Db::name('category_setting')->where('name', 'show_in_credit_detail')->value('value');
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