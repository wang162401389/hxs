<?php

namespace app\admin\validate;

use think\Validate;

class Loan extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'title'  =>  'require|max:30',
        'limit_range' => 'require|max:13',
        'interest' => 'require|max:10',
        'loan_time' => 'require|max:10',
        'deadline_range' => 'require|max:10',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'title.require' => '类型必须',
        'title.max' => '标题最多不能超过30个字符',
        'limit_range.require' => '额度范围必须',
        'limit_range.max' => '额度范围最多不能超过13个字符',
        'interest.require' => '利息必须',
        'interest.max' => '利息最多不能超过10个字符',
        'loan_time.require' => '放款时间必须',
        'loan_time.max' => '放款时间最多不能超过10个字符',
        'deadline_range.require' => '放款时间必须',
        'deadline_range.max' => '放款时间最多不能超过10个字符',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'add'  => [],
        'edit' => [],
    ];
    
}
