<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use fast\Random;
use think\Config;
use think\Lang;
use think\Validate;
use think\Db;

/**
 * Ajax异步请求接口
 * @internal
 */
class Ajax extends Frontend
{

    protected $noNeedLogin = ['lang'];
    protected $noNeedRight = ['*'];
    protected $layout = '';

    /**
     * 加载语言包
     */
    public function lang()
    {
        header('Content-Type: application/javascript');
        $callback = $this->request->get('callback');
        $controllername = input("controllername");
        $this->loadlang($controllername);
        //强制输出JSON Object
        $result = 'define(' . json_encode(Lang::get(), JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE) . ');';
        return $result;
    }

    /**
     * 上传文件
     */
    public function upload()
    {
        $file = $this->request->file('file');

        //判断是否已经存在附件
        $sha1 = $file->hash();
        $uploaded = model("attachment")->where('sha1', $sha1)->find();
        if ($uploaded)
        {
            $this->success('', null, [
                'url' => $uploaded['url']
            ]);
        }

        $upload = Config::get('upload');

        preg_match('/(\d+)(\w+)/', $upload['maxsize'], $matches);
        $type = strtolower($matches[2]);
        $typeDict = ['b' => 0, 'k' => 1, 'kb' => 1, 'm' => 2, 'mb' => 2, 'gb' => 3, 'g' => 3];
        $size = (int) $upload['maxsize'] * pow(1024, isset($typeDict[$type]) ? $typeDict[$type] : 0);
        $fileInfo = $file->getInfo();
        $suffix = strtolower(pathinfo($fileInfo['name'], PATHINFO_EXTENSION));
        $suffix = $suffix ? $suffix : 'file';
        $replaceArr = [
            '{year}'     => date("Y"),
            '{mon}'      => date("m"),
            '{day}'      => date("d"),
            '{hour}'     => date("H"),
            '{min}'      => date("i"),
            '{sec}'      => date("s"),
            '{random}'   => Random::alnum(16),
            '{random32}' => Random::alnum(32),
            '{filename}' => $suffix ? substr($fileInfo['name'], 0, strripos($fileInfo['name'], '.')) : $fileInfo['name'],
            '{suffix}'   => $suffix,
            '{.suffix}'  => $suffix ? '.' . $suffix : '',
            '{filemd5}'  => md5_file($fileInfo['tmp_name']),
        ];
        $savekey = $upload['savekey'];
        $savekey = str_replace(array_keys($replaceArr), array_values($replaceArr), $savekey);

        $uploadDir = substr($savekey, 0, strripos($savekey, '/') + 1);
        $fileName = substr($savekey, strripos($savekey, '/') + 1);
        //
        $splInfo = $file->validate(['size' => $size])->move(ROOT_PATH . '/public' . $uploadDir, $fileName);
        if ($splInfo)
        {
            $imagewidth = $imageheight = 0;
            if (in_array($suffix, ['gif', 'jpg', 'jpeg', 'bmp', 'png', 'swf']))
            {
                $imgInfo = getimagesize($splInfo->getPathname());
                $imagewidth = isset($imgInfo[0]) ? $imgInfo[0] : $imagewidth;
                $imageheight = isset($imgInfo[1]) ? $imgInfo[1] : $imageheight;
            }
            $params = array(
                'filesize'    => $fileInfo['size'],
                'imagewidth'  => $imagewidth,
                'imageheight' => $imageheight,
                'imagetype'   => $suffix,
                'imageframes' => 0,
                'mimetype'    => $fileInfo['type'],
                'url'         => $uploadDir . $splInfo->getSaveName(),
                'uploadtime'  => time(),
                'sha1'        => $sha1,
            );
            model("attachment")->create(array_filter($params));
            $this->success('', null, [
                'url' => $uploadDir . $splInfo->getSaveName()
            ]);
        }
        else
        {
            // 上传失败获取错误信息
            $this->error($file->getError());
        }
    }

    /**
     * 提交申请(简陋版，待加强)
     */
    public function apply()
    {
        if ($this->request->isPost())
        {
            $result = $this->postData($this->request->post());
            if ($result === true)
            {
                $this->code = 1;
                $this->msg = '获取成功';
            }
            else 
            {
                $this->code = -1;
                $this->msg = $result;
            }
        }
    }
    
    private function postData($data)
    {
        $insertData = [];
        
        $insertData['username'] = $data['username'];
        $insertData['cellphone'] = $data['cellphone'];
        if (isset($data['gender'])) {
            $insertData['gender'] = $data['gender'];
        }
        $insertData['area_id'] = $data['area_id'];
        if (isset($data['loan_id'])) 
        {
            $insertData['loan_id'] = $data['loan_id'];
        }
        if (isset($data['borrow_money'])) 
        {
            $insertData['borrow_money'] = $data['borrow_money'] * 10000;
        }
        if (isset($data['age'])) 
        {
            $insertData['age'] = $data['age'];
        }
        if (isset($data['has_house'])) 
        {
            $insertData['has_house'] = $data['has_house'];
        }
        if (isset($data['has_car'])) 
        {
            $insertData['has_car'] = $data['has_car'];
        }
        if (isset($data['profession'])) 
        {
            $insertData['profession'] = $data['profession'];
        }
        $insertData['create_time'] = $_SERVER['REQUEST_TIME'];
        
        $result = $this->validateApply($insertData);
        if ($result === true) 
        {
            $apply = true;
            $record = Db::name('apply')
                        ->where('cellphone', $insertData['cellphone'])
                        ->field('create_time')
                        ->order('id desc')
                        ->find();
            
            if (!empty($record) && $record['create_time'] + 3600 * 24 >= $_SERVER['REQUEST_TIME']) 
            {
                $apply = false;
            }
            
            if ($apply) 
            {
                $res = Db::name('apply')->insert($insertData);
                if ($res)
                {
                    return true;
                }
                else 
                {
                    return '申请失败';
                }
            }
            else 
            {
                return '你好，24小时内只允许申请一次';
            }
        }
        else 
        {
            return $result;
        }
    }
    
    private function validateApply($data)
    {
        $rules = [
            'username' => 'require|max:25',
            'area_id' => 'number'
        ];
        
        $msg = [
            'username.require' => '名称必须',
            'username.max'     => '名称最多不能超过25个字符',
            'age.number'   => '年龄必须是数字',
            'age.between'  => '年龄只能在1-120之间',
        ];
        
        $field = [
            'username' => '真实姓名',
            'age' => '年龄',
            'gender' => '性别',
        ];
        
        $validate = new Validate($rules, $msg, $field);
        
        if (isset($data['gender'])) {
            $validate->rule('gender', 'number|in:0,1');
        }
        if (isset($data['loan_id']))
        {
            $validate->rule('loan_id', 'number');
        }
        if (isset($data['borrow_money']))
        {
            $validate->rule('borrow_money', 'number');
        }
        if (isset($data['age']))
        {
            $validate->rule('age', 'number|between:1,120');
        }
        if (isset($data['has_house']))
        {
            $validate->rule('has_house', 'number');
        }
        if (isset($data['has_car']))
        {
            $validate->rule('has_car', 'number');
        }
        if (isset($data['profession']))
        {
            $validate->rule('profession', 'number');
        }
        if (isset($data['accept']))
        {
            $validate->rule('accept', 'accepted');
        }
        
        $result = $validate->check($data);
        return !$result ? $validate->getError() : true;
    }
    
    /**
     * 首页贷款问答搜索
     */
    public function getAskSearchList()
    {
        if ($this->request->isAjax() && $this->request->isPost())
        {
            $title = $this->request->post('title');
            
            $result = Db::name('question')->where('title', 'like', '%'.$title.'%')->where('status', 'normal')->limit(7)->order('weigh desc, create_time desc')->select();
            
            $this->code = 1;
            $this->msg = '搜索完毕';
            $this->data = ['total' => count($result), 'row' => $result];
        }
    }
    
    /**
     * 提交建议
     */
    public function postSuggest()
    {
        if ($this->request->isAjax() && $this->request->isPost())
        {
            $content = $this->request->post('content');
            $phone = $this->request->post('phone');
            $this->code = 0;
            if (!empty($content) && !empty($phone)) 
            {
                $result = Db::name('suggestion')->insert(['mobile' => $phone, 'content' => $content, 'create_time' => $_SERVER['REQUEST_TIME']]);
                if ($result > 0) 
                {
                    $this->code = 1;
                    $this->msg = '搜索成功';
                }
            }
        }
    }
    
    /**
     * 读取省市区数据,联动列表
     */
    public function area()
    {
        $province = $this->request->get('province');
        $city = $this->request->get('city');
        $where = ['pid' => 0, 'level' => 1];
        $provincelist = null;
        if ($province !== '')
        {
            if ($province)
            {
                $where['pid'] = $province;
                $where['level'] = 2;
            }
            if ($city !== '')
            {
                if ($city)
                {
                    $where['pid'] = $city;
                    $where['level'] = 3;
                }
                $provincelist = Db::name('area')->where($where)->field('id as value,name')->select();
            }
        }
        $this->success('', null, $provincelist);
    }
}