<?php

namespace app\admin\model;

use think\Model;

class Apply extends Model
{
    // 表名
    protected $name = 'apply';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    
    // 追加属性
    protected $append = [
        'create_time_text'
    ];
    
    public function applyremark()
    {
        return $this->hasMany('ApplyRemark', 'apply_id')->field('content,create_time');
    }

    public function getCreateTimeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['create_time'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setCreateTimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }

    public function getGenderAttr($value)
    {
        $gender = [0 => '女', 1 => '男', 2 => '-'];
        return $gender[$value];
    }
    
    public function getHasHouseAttr($value)
    {
        $has_house = [0 => '无', 1 => '有'];
        return $has_house[$value];
    }
    
    public function getHasCarAttr($value)
    {
        $has_car = [0 => '无', 1 => '有'];
        return $has_car[$value];
    }
    
    public function getProfessionAttr($value)
    {
        return $value > 0 ? config('site.profession')[$value] : '';
    }
    
    public function getStatusAttr($value)
    {
        $status = [0 => '潜在客户', 1 => '不成交客户', 2 => '已成交客户'];
        return $status[$value];
    }
    
    public function getAreaIdAttr($value)
    {
        $area = \think\Db::name('area')->where('id', $value)->value('mergename');
        return $area;
    }
    
    public function getFollowUpAttr($value)
    {
        $name = '';
        if ($value) 
        {
            $uinfo = Admin::get($value);
            if ($uinfo) 
            {
                $name = $uinfo->username;
            }
        }
        
        return $name;
    }
}