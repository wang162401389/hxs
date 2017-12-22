<?php

namespace app\common\model;

use think\Model;

/**
 * 分类模型
 */
class Category Extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    // 追加属性
    protected $append = [
        'type_text',
    ];
    
    public function loans()
    {
        return $this->hasMany('app\admin\model\Loan', 'type');
    }
    
    public function articles()
    {
        return $this->hasMany('app\admin\model\Article', 'category_id');
    }

    /**
     * 读取分类类型
     * @return array
     */
    public static function getTypeList()
    {
        $typeList = config('site.categorytype');
        foreach ($typeList as $k => &$v)
        {
            $v = __($v);
        }
        return $typeList;
    }

    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['type'];
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    /**
     * 读取分类列表
     * @param string $type 指定类型
     * @param string $status 指定状态
     * @param string $order 指定排序
     * @param string $field 指定字段
     * @param string $pid 指定父ID
     * @return array
     */
    public static function getCategoryArray($type = NULL, $status = NULL, $order = NULL, $field = '', $pid = NULL, $limit = NULL)
    {
        $list = collection(self::where(function($query) use($pid, $type, $status) {
                    if (!is_null($pid))
                    {
                        $query->where('pid', '=', $pid);
                    }
                    if (!is_null($type))
                    {
                        $query->where('type', '=', $type);
                    }
                    if (!is_null($status))
                    {
                        $query->where('status', '=', $status);
                    }
                })->order('weigh', is_null($order) ? 'desc' : 'asc')->field($field)->limit($limit)->select())->toArray();
        return $list;
    }
}