<?php

namespace app\admin\controller;

use app\common\controller\Backend;

use think\Controller;
use think\Request;

/**
 * 广告管理
 *
 * @icon fa fa-circle-o
 */
class Advert extends Backend
{
    
    /**
     * Advert模型对象
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Advert');

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
                    
                    $pic_arr = explode(',', $params['pic']);
                    foreach ($pic_arr as $k => $v) {
                        $params['value'][$k]['pic'] = $v;
                        $params['value'][$k]['url'] = '';
                        if (isset($params['url'])) {
                            $url_arr = array_values($params['url']['value']);
                            $params['value'][$k]['url'] = isset($url_arr[$k]) ? $url_arr[$k] : '';
                        }
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
    
    /**
     * 编辑
     */
    public function edit($ids = NULL)
    {
        $row = $this->model->get($ids);
        if (!$row)
        {
            $this->error(__('No Results were found'));
        }
            
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds))
        {
            if (!in_array($row[$this->dataLimitField], $adminIds))
            {
                $this->error(__('You have no permission'));
            }
        }
        if ($this->request->isPost())
        {
            $params = $this->request->post("row/a");
            if ($params)
            {
                try
                {
                    //是否采用模型验证
                    if ($this->modelValidate)
                    {
                        $name = basename(str_replace('\\', '/', get_class($this->model)));
                        $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : true) : $this->modelValidate;
                        $row->validate($validate);
                    }
                    
                    $pic_arr = explode(',', $params['pic']);
                    foreach ($pic_arr as $k => $v) {
                        $params['value'][$k]['pic'] = $v;
                        $params['value'][$k]['url'] = '';
                        if (isset($params['url'])) {
                            $url_arr = array_values($params['url']['value']);
                            $params['value'][$k]['url'] = isset($url_arr[$k]) ? $url_arr[$k] : '';
                        }
                    }
                    
                    $result = $row->allowField(true)->save($params);
                    if ($result !== false)
                    {
                        $this->success();
                    }
                    else
                    {
                        $this->error($row->getError());
                    }
                }
                catch (\think\exception\PDOException $e)
                {
                    $this->error($e->getMessage());
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        
        $row = $row->toArray();
        
        $pic_arr = array_column($row['value'], 'pic');
        $row['pic_str'] = implode(',', $pic_arr);
        
        $row['url_arr'] = array_column($row['value'], 'url');
        
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }
}