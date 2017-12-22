<?php
namespace app\admin\model;

use think\Model;

class Reply extends Model
{
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;
    
    // 定义时间戳字段名
    protected $updateTime = false;
    
    // 追加属性
    protected $append = [
        'mb_content'
    ];
    
    public function question()
    {
        return $this->belongsTo('question');
    }
    
    public function getMbContentAttr($value, $data)
    {
        $value = $value ? $value : $data['content'];
        return mb_strlen($value) > 90 ? mb_substr($value, 0, 90) : $value;
    }
}