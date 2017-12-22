<?php

namespace app\admin\model;

use think\Model;

class Suggestion extends Model
{
    // 表名
    protected $name = 'suggestion';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    
    // 追加属性
    protected $append = [
        'create_time_text',
        'mb_content'
    ];

    public function getCreateTimeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['create_time'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setCreateTimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }

    public function getMbContentAttr($value, $data)
    {
        $value = $value ? $value : $data['content'];
        return mb_strlen($value) > 100 ? mb_substr($value, 0, 30).'......' : $value;
    }
}