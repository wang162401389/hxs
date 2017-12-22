<?php
namespace app\admin\model;

use think\Model;

class ApplyRemark extends Model
{
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;
    
    // 定义时间戳字段名
    protected $updateTime = false;
    
    public function apply()
    {
        return $this->belongsTo('apply');
    }
}