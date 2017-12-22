<?php

namespace app\admin\model;

use think\Model;

class Question extends Model
{
    // 表名
    protected $name = 'question';
    
    protected $readonly = ['create_time'];
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;

    // 定义时间戳字段名
    protected $updateTime = false;
    
    // 追加属性
    protected $append = [
        'create_time_text',
        'status_text'
    ];
    
    public function replys()
    {
        return $this->hasMany('Reply', 'question_id')->field('author,create_time,content');
    }
    
    public function getStatusList()
    {
        return ['normal' => __('Normal'), 'hidden' => __('Hidden')];
    }

    public function getCreateTimeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['create_time'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getStatusTextAttr($value, $data)
    {        
        $value = $value ? $value : $data['status'];
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    protected function setCreateTimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }
}