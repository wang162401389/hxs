<?php

namespace app\common\controller;

use app\admin\model\Advert;
use think\Config;
use think\Controller;
use think\Hook;
use think\Lang;

class Frontend extends Controller
{

    /**
     * 返回码,默认为null,当设置了该值后将输出json数据
     * @var int
     */
    protected $code = null;
    
    /**
     * 返回内容,默认为null,当设置了该值后将输出json数据
     * @var mixed
     */
    protected $data = null;
    
    /**
     * 返回文本,默认为空
     * @var mixed
     */
    protected $msg = '';
    
    /**
     * 布局模板
     * @var string
     */
    protected $layout = '';
    
    /**
     * 广告位
     * @var mixed
     */
    protected $ad = '';

    public function _initialize()
    {
        //移除HTML标签
        $this->request->filter('strip_tags');
        $modulename = $this->request->module();
        $controllername = strtolower($this->request->controller());
        $actionname = strtolower($this->request->action());

        // 如果有使用模板布局
        if ($this->layout)
        {
            $this->view->engine->layout('layout/' . $this->layout);
        }

        // 语言检测
        $lang = strip_tags(Lang::detect());

        $site = Config::get("site");

        $upload = \app\common\model\Config::upload();

        // 上传信息配置后
        Hook::listen("upload_config_init", $upload);
        
        // 配置信息
        $config = [
            'site'           => array_intersect_key($site, array_flip(['name', 'cdnurl', 'version', 'timezone', 'languages'])),
            'upload'         => $upload,
            'modulename'     => $modulename,
            'controllername' => $controllername,
            'actionname'     => $actionname,
            'jsname'         => 'frontend/' . str_replace('.', '/', $controllername),
            'moduleurl'      => rtrim(url("/{$modulename}", '', false), '/'),
            'language'       => $lang
        ];
        
        Config::set('upload', array_merge(Config::get('upload'), $upload));
        
        // 配置信息后
        Hook::listen("config_init", $config);
        $this->loadlang($controllername);
        $this->assign('ad_info', $this->loadad($this->ad));
        $this->assign('site', $site);
        $this->assign('config', $config);
    }

    /**
     * 加载语言文件
     * @param string $name
     */
    protected function loadlang($name)
    {
        Lang::load(APP_PATH . $this->request->module() . '/lang/' . Lang::detect() . '/' . str_replace('.', '/', $name) . '.php');
    }
    
    /**
     * 加载广告位
     */
    protected function loadad($name)
    {
        if (!empty($name)) 
        {
            $res = Advert::getByName($name);
            return !empty($res) ? $res->toArray() : '';
        }
        return '';
    }
    
    /**
     * 渲染配置信息
     * @param mixed $name 键名或数组
     * @param mixed $value 值 
     */
    protected function assignconfig($name, $value = '')
    {
        $this->view->config = array_merge($this->view->config ? $this->view->config : [], is_array($name) ? $name : [$name => $value]);
    }

    /**
     * 析构方法
     *
     */
    public function __destruct()
    {
        //判断是否设置code值,如果有则变动response对象的正文
        if (!is_null($this->code))
        {
            $this->result($this->data, $this->code, $this->msg, 'json');
        }
    }
}