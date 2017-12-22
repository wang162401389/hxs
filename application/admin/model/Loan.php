<?php

namespace app\admin\model;

use think\Model;

class Loan extends Model
{
    // 表名
    protected $name = 'loan';
    
    protected $auto = [];
    protected $insert = ['create_time','status' => 0];
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;

    // 定义时间戳字段名
    protected $createTime = 'create_time';
    protected $updateTime = false;
    
    // 追加属性
    protected $append = [
        'create_time_text',
        'publish_time_text'
    ];

    public function getCreateTimeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['create_time'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    public function getPublishTimeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['publish_time'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setCreateTimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }

    protected function setPublishTimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }
    
    public static function getRepaymentTypeList()
    {
        return [1 => '分期还款', 2 => '随借随还', 3 => '定期付息，到期还本'];
    }
    
    public function getStatusAttr($value)
    {
        $status = [0 => '未发布', 1 => '已发布'];
        return $status[$value];
    }
    
    public function category()
    {
        return $this->belongsTo('app\common\model\Category', 'type')->setEagerlyType(0);
    }
}