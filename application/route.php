<?php
use think\Route;
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

//如果有定义绑定后台模块则禁用路由规则 
if (Route::getBind('module') == 'admin'){
    return [];
}

//Route::rule('路由表达式','路由地址','请求类型','路由参数（数组）','变量规则（数组）');
// Route::rule([
//     '路由规则1'=>'路由地址和参数',
//     '路由规则2'=>['路由地址和参数','匹配参数（数组）','变量规则（数组）']
//     ...
// ],'','请求类型','匹配参数（数组）','变量规则');

Route::pattern([
    'id' => '\d+',
]);

//快捷路由
//Route::controller('strategy', 'index/Strategy');

//路由别名
Route::alias('about', 'index/About');

Route::rule([
    //贷款计算器
    'calculate/:type' => 'index/Index/calculate',
    //网站地图
    'map' => 'index/Index/map',
    
    //贷款攻略首页
    'strategy' => 'index/Strategy/index',
    //贷款攻略列表
    'strategy/lists/:id' => 'index/Strategy/lists',
    //贷款攻略详情
    'strategy/:id' => 'index/Strategy/detail',
    
    //信贷产品列表
    'credit' => 'index/Credit/index',
    //信用贷详情
    'credit/:id' => 'index/Credit/detail',
    
    //房抵贷首页
    'house' => 'index/House/index',
    //房抵贷详情
    'house/:id' => 'index/House/detail',
    //房抵贷更多
    'house/more' => 'index/House/more',
    
    //车抵贷首页
    'car' => 'index/Car/index',
    //车抵贷详情
    'car/:id' => 'index/Car/detail',
    //车抵贷更多
    'car/more' => 'index/Car/more',
    
    //贷款问答首页
    'ask' => 'index/Ask/index',
    //贷款问答详情
    'ask/:id' => 'index/Ask/detail',
    
    //企业动态详情
    'dynamic/:id' => 'index/About/dynamicDetail',
    //媒体报道详情
    'media/:id' => 'index/About/mediaDetail',
]);

return [
    //别名配置,别名只能是映射到控制器且访问时必须加上请求的方法
    '__alias__'   => [
    ],
    //变量规则
    '__pattern__' => [
    ],

];
