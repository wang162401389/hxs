<?php

namespace app\index\controller;

use app\common\controller\Frontend;

class About extends Frontend
{
    
    /**
     * 关于我们配置
     * @var mixed
     */
    protected $config = [];
    
    public function _initialize()
    {
        $this->config = \think\Db::name('about')->column('name,value');
        parent::_initialize();
    }
    
    public function index()
    {
        $this->view->assign('content', $this->config['introduce']);
        return $this->view->fetch();
    }
    
    public function dynamic()
    {
        if ($this->request->isAjax() && $this->request->isPost())
        {
            $params = $this->request->post();
            $page = isset($params['page']) ? $params['page'] : 1;
            $result = \Think\Db::name('article')
                    ->where('type', 'dynamic')
                    ->limit(config('paginate.list_rows'))
                    ->page($page)
                    ->where('status', 'normal')
                    ->select();
            
            if (!empty($result)) 
            {
                foreach ($result as &$v) 
                {
                    $v['content'] = str_replace('&nbsp;', '', strip_tags($v['content']));
                }
            }
            
            $this->code = 1;
            $this->msg = '搜索成功';
            $this->data = ['total' => count($result), 'row' => $result];
        }
        
        return $this->view->fetch();
    }
    
    public function dynamicDetail($id = null)
    {
        $row = \think\Db::name('article')->where(['id' => $id])->find();
        if (!$row || $row['type'] != 'dynamic')
        {
            $this->error('没有找到记录');
        }
        $this->view->assign('row', $row);
        return $this->view->fetch();
    }
    
    public function media()
    {
        if ($this->request->isAjax() && $this->request->isPost())
        {
            $params = $this->request->post();
            $page = isset($params['page']) ? $params['page'] : 1;
            $result = \Think\Db::name('article')
                    ->where('type', 'media')
                    ->limit(config('paginate.list_rows'))
                    ->page($page)
                    ->where('status', 'normal')
                    ->select();
            
            $this->code = 1;
            $this->msg = '搜索成功';
            $this->data = ['total' => count($result), 'row' => $result];
        }
        
        return $this->view->fetch();
    }
    
    public function mediaDetail($id = null)
    {
        $row = \think\Db::name('article')->where(['id' => $id])->find();
        if (!$row || $row['type'] != 'media')
        {
            $this->error('没有找到记录');
        }
        $this->view->assign('row', $row);
        return $this->view->fetch();
    }
    
    public function contact()
    {
        $this->view->assign('content', $this->config['contact']);
        return $this->view->fetch();
    }
    
    public function cooperation()
    {
        $this->view->assign('content', $this->config['cooperation']);
        return $this->view->fetch();
    }
    
    public function joinus()
    {
        $this->view->assign('content', $this->config['joinus']);
        return $this->view->fetch();
    }
    
    public function disclaimer()
    {
        $this->view->assign('content', $this->config['disclaimer']);
        return $this->view->fetch();
    }
    
    public function suggest()
    {
        $this->view->assign('content', $this->config['suggest']);
        return $this->view->fetch();
    }
}