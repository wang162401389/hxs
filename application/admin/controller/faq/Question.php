<?php

namespace app\admin\controller\faq;

use app\common\controller\Backend;
use think\Controller;
use app\admin\model\Question as QuestionModel;

/**
 * 
 *
 * @icon question
 */
class Question extends Backend
{
    
    /**
     * Question模型对象
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Question');
        $this->view->assign("statusList", $this->model->getStatusList());
    }
    
    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个方法
     * 因此在当前控制器中可不用编写增删改查的代码,如果需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    
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
                $params['author'] = $this->auth->username;
                try
                {
                    //是否采用模型验证
                    if ($this->modelValidate)
                    {
                        $name = basename(str_replace('\\', '/', get_class($this->model)));
                        $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : true) : $this->modelValidate;
                        $this->model->validate($validate);
                    }
                    $result = $this->model->allowField(true)->save($params);
                    if ($result !== false)
                    {
                        // 回答数+1
                        \think\db::name('question')->where('id', $this->model->id)->setInc('reply_count');
                        
                        //添加到回复表
                        $question = QuestionModel::find($this->model->id);
                        //增加一个关联数据
                        $data = [
                            'content' => $params['content'],
                            'author' => $this->auth->username
                        ];
                        $question->replys()->save($data);
                        
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
                    $result = $row->allowField(true)->save($params);
                    if ($result !== false)
                    {
                        // 回答数+1
                        \think\db::name('question')->where('id', $ids)->setInc('reply_count');
                        
                        //添加到回复表
                        $question = QuestionModel::find($ids);
                        //增加一个关联数据
                        $data = [
                            'content' => $params['content'],
                            'author' => $this->auth->username
                        ];
                        $question->replys()->save($data);
                        
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
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }

    /**
     * 回答详情
     */
    public function replyList($id)
    {
        $question = QuestionModel::get($id);
        
        $row = collection($question->replys)->toArray();
        
        if (!$row)
        {
            $this->error(__('No Results were found'));
        }
        
        $this->assign('list', $row);
        return $this->view->fetch();
    }
}