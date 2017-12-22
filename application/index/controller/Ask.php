<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\admin\model\Question;

class Ask extends Frontend
{
    public function _initialize()
    {
        parent::_initialize();
    }
    
    public function index()
    {
        if ($this->request->isAjax() && $this->request->isPost())
        {
            $params = $this->request->post();
            $page = isset($params['page']) ? $params['page'] : 1;
            
            $map = ['status' => 'normal'];
            if (!empty($params['title'])) 
            {
                $map['title'] = ['like', '%'.$params['title'].'%'];
            }
            
            $count = \think\Db::name('question')->where($map)->count();
            
            $list = \think\Db::name('question')
                    ->where($map)
                    ->limit(config('paginate.list_rows'))
                    ->page($page)
                    ->order('weigh desc, create_time desc')
                    ->select();
            
            if (!empty($list)) 
            {
                foreach ($list as &$v) 
                {
                    $question = Question::get($v['id']);
                    $v['reply_list'] = $question->replys()->select();
                }
            }
            $this->code = 1;
            $this->msg = '获取成功';
            $this->data = ['total' => $count, 'row' => !empty($list) ? $list : []];
        }
        
        $bottom_pic = $this->loadad('ask_index_bottom');
        $this->view->assign('botttom_pic', $bottom_pic);
        
        return $this->view->fetch();
    }
    
    public function detail($id = NULL)
    {
        $row = \think\Db::name('question')->where(['id' => $id])->find();
        if (!$row)
        {
            $this->error('没有找到记录');
        }
        
        $question = Question::get($id);
        $reply = $question->replys()->select();
        
        $this->view->assign('row', $row);
        $this->view->assign('replylist', collection($reply)->toArray());
        
        $bottom_pic = $this->loadad('ask_detail_bottom');
        $this->view->assign('botttom_pic', $bottom_pic);
        
        return $this->view->fetch();
    }
}