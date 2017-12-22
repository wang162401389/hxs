<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 控制台
 *
 * @icon fa fa-dashboard
 * @remark 用于展示当前系统中的统计数据、统计报表及重要实时数据
 */
class Dashboard extends Backend
{

    /**
     * 查看
     */
    public function index()
    {
        $map['status'] = 0;
        if ($this->auth->isSuperAdmin() === false) {
            $map['follow_up'] = $this->auth->id;
        }
        $to_deal_order_num = \think\db::name('apply')->where($map)->count('id');
        
        $to_deal_suggestion_num = \think\db::name('suggestion')->count('id');
        
        $this->view->assign([
            'to_deal_order_num' => $to_deal_order_num,
            'to_deal_suggestion_num' => $to_deal_suggestion_num,
        ]);

        return $this->view->fetch();
    }

}
