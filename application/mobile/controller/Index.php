<?php
namespace app\mobile\controller;

use app\common\controller\Frontend;

class Index extends Frontend
{
    protected $ad = 'mobile_index_carousel_figure';
    
    public function _initialize()
    {
        parent::_initialize();
    }
    
    /**
     * 首页
     */
    public function index()
    {
        return $this->view->fetch();
    }
    
    /**
     * 公司介绍
     */
    public function about()
    {
        $content = \think\Db::name('about')->where('name', 'introduce')->value('value');
        $this->view->assign('content', $content);
        return $this->view->fetch();
    }
    
    /**
     * 快速申请
     */
    public function apply()
    {
        return $this->view->fetch();
    }
    
    /**
     * 协议
     */
    public function agreement()
    {
        return $this->view->fetch();
    }
}