function GetObj(objName)
{
	if(document.getElementById)
	{
		return eval('document.getElementById("' + objName + '")');
	}
	else
	{
		return eval('document.all.' + objName);
	}
}

//unicode码转汉子
function hexToDec(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}


// 改变输入框样式
function ChangeStyle(curObj, msg) {
    curObj.setStyle({ "border-color": "red" });
    curObj.focus();
    msg = '<span class="icon"></span>' + msg;
    curObj.next("span").innerHTML = msg;
}

function CheckElem(curObj, msg)
{
	if(msg==null) msg="";
	if(curObj.value=='')
	{
	    msg += "不能为空!";
	    ChangeStyle(curObj, msg);
		return false;
	}
	else if(isNaN(curObj.value))
	{
        /*
		alert(msg + "\u5fc5\u987b\u4e3a\u6570\u5b57!");
		curObj.focus();
		curObj.select();
		return false;
        */
	    msg += "必须为数字!";
	    ChangeStyle(curObj, msg);
	    return false;
	}
	else if ((isNaN(curObj.value)) || (curObj.value.indexOf("-")!=-1))
	{
	    msg += "请输入正数!";
	    ChangeStyle(curObj, msg);
		return false;
	}
	else if ((isNaN(curObj.value)) || (curObj.value ==0))
	{
	    msg += "不能为零!";
	    ChangeStyle(curObj, msg);
		return false;
	}
	else
	{
	    curObj.setStyle({ "border-color": "#b4b9bd" })
	    curObj.next("span").innerHTML = "";
		return true;
	}
}

function CheckEmpty(curObj, msg)
{
	if(msg==null) msg="";
	if(curObj.value=='')
	{
	    msg += "不能为空!";
	    ChangeStyle(curObj, msg);
		return false;
	}
	else
	{
		return true;
	}
}

function CheckIsNaN(curObj, msg)
{
	if(msg==null) msg="";
	if(isNaN(curObj.value))
	{
	    msg += "必须为数字!";
	    ChangeStyle(curObj, msg);
		return false;
	}
	else
	{
		return true;
	}
}

function IsIntYear(curObj, type, msg)
{
	if(msg==null) msg="";
	v = curObj.value;
    var vArr = v.match(/^[0-9]+$/);
    if (v > 30 && type == '')//最长不能超过30年!
    {
        msg += "最长不能超过30年!";
        ChangeStyle(curObj, msg);
        return false;
    }
    else if(v>360 && type==1)
    {
        msg += "最长不能超过30年!";
        ChangeStyle(curObj, msg);
        return false;
    }
    else if(v<12 && type ==2)
    {
        msg += "的最小期限必须大于等于1年!";
        ChangeStyle(curObj, msg);
        return false;
    }
    else if(vArr == null)
    {
        msg += "请填写整数!";
		ChangeStyle(curObj, msg);
        return false;
    }
    else
    {
    	return true;
    }
}

function IsIntAmountCheck(v, curObj, type, msg) {
    if (msg == null) msg = "";
    if (v > 10000000 && type == 1)//dai kuan fei yong
    {
        msg += "最高不能超过1000万元!";
        ChangeStyle(curObj, msg);
        return false;
    }
    else if (v > 1000000 && type == 4)//gong ji jin dai kuan e du
    {
        msg += "最高不能超过100万元!";
        ChangeStyle(curObj, msg);
        return false;
    }
    else if (v > 50000000 && type == 2)//fang wu zong jia
    {
        msg += "最高不能超过5000万元!";
        ChangeStyle(curObj, msg);
        return false;
    }
    else if (v > 50 && type == 3)//dai kuan li lv
    {
        msg += "最高不能超过50%!";
        ChangeStyle(curObj, msg);
        return false;
    }
    else {
        return true;
    }
}


function IsIntAmount(v, type, msg)
{
	if(msg==null) msg="";
    if (v>10000000 && type==1)//dai kuan fei yong
    {
    	alert(msg + "\u6700\u9ad8\u4e0d\u80fd\u8d85\u8fc71000\u4e07\u5143!");
        return false;
    }
    else if(v>1000000 && type ==4)//gong ji jin dai kuan e du
    {
    	alert(msg + "\u6700\u9ad8\u4e0d\u80fd\u8d85\u8fc7100\u4e07\u5143!");
        return false;
    }
    else if(v>50000000 && type==2)//fang wu zong jia
    {
    	alert(msg + "\u6700\u9ad8\u4e0d\u80fd\u8d85\u8fc75000\u4e07\u5143!");
        return false;
    }
    else if(v>50 && type ==3)//dai kuan li lv
    {
    	alert(msg + "\u6700\u9ad8\u4e0d\u80fd\u8d85\u8fc750%!");
        return false;
    }
    else
    {
    	return true;
    }
}

function Format(myFloat)
{
	if(isNaN(myFloat) || myFloat.toString().toLowerCase().indexOf("infinity")>-1) 
	{
		alert("\u8ba1\u7b97\u7ed3\u679c\u4e0d\u5408\u6cd5,\u53ef\u80fd\u662f\u88ab\u9664\u6570\u4e3a\u96f6,\u8bf7\u91cd\u65b0\u8f93\u5165!");
		return "";
	}
	else
	{
		return Math.round(myFloat * 100)/100;
	}
}


function Cal_strtodate(str)
{
  var date = Date.parse(str);
  if (isNaN(date)) 
  {
    date = Date.parse(str.replace(/-/g,"/")); 
    if (isNaN(date)) date = 0;
  }
  return(date);
}

function showhidden(value , obid)
{
	if(value == '1')
	{
	  document.getElementById(obid).style.display = 'none'; //hidden
	 }
	else
	{
	  document.getElementById(obid).style.display = ''; //
	 }
}


function CalcByIntrest(a, y, r, f)
{
	/*
	 * a:	dai kuan jin e
	 * y:	qi xian (yue)
	 * r:	li lv
	 * f:	huan kuan pin lv
	 * m:	mei qi chang huan de li xi
	 * n:	mei qi chang huan de ben jin
	 * x:	chang huan li xi zong e
	 * sum:	chang huan ben jin zong e
	 */
	var fortnight_repayment; //shuang zhou huank uan 
	var monthly_repayment;	//yue jun huan kuan 
	var quarter_repayment;	//ji du huan kuan 
	var onetime_repayment;	//yi ci xing huan kuan
	var tot_int;						//li xi zong e
	var tot_expenditure;		//huan kuan zong e
	var sum = 0;
	var x = 0;
	var template ='';
	var w;
	
	switch (f)
	{
		case 1: //shuang zhou 
			var last_principal = new Array();
			fortnight_repayment = (a * r / 12 + (a * r / 12) / (Math.pow((1 + r / 12), y) - 1)) / 2;
		    //还款明细
			template='<table class="tab-results"><caption>\u8fd8\u6b3e\u660e\u7ec6</caption><tr><th>'+'\u671f\u6b21'+'</th><th>'+'\u507f\u8fd8\u5229\u606f'+'</th><th>'+'\u507f\u8fd8\u672c\u91d1'+'</th><th>'+'\u8fd8\u6b3e\u989d'+'</th><th>'+'\u5269\u4f59\u672c\u91d1'+'</th></tr>';
			for (k=1; k<=(y/12)*26-1; k++)
			{
				m = (a-sum)*r/26;
				n = fortnight_repayment - m;
				sum =sum + n;
				if(m<=0)
				{
					m= 0;
				}
				x += m;
				z = a-sum;
				if(z<=0)
				{
					z=0;
					break;
				}
				if(z != 0)
				{
					last_principal.push(z);
				}		
				template += '<tr><td class="text_center th_sml">'+k+'\u671f'+'</td><td class="text_center">'+m.toFixed(2)+'\u5143'+'</td><td class="text_center">'+(fortnight_repayment-m).toFixed(2)+'\u5143'+'</td><td class="text_center">'+fortnight_repayment.toFixed(2)+'\u5143'+'</td><td class="text_center">'+(a-sum).toFixed(2)+'\u5143'+'</td></tr>'	;			
			}
			w = last_principal[last_principal.length - 1];
			template+='<tr><td class="text_center th_sml">'+k+'\u671f'+'</td><td class="text_center">'+(w*r/26).toFixed(2)+'\u5143'+'</td><td class="text_center">'+w.toFixed(2)+'\u5143'+'</td><td class="text_center">'+(w*(r/26+1)).toFixed(2)+'\u5143'+'</td><td class="text_center">'+0+'\u5143'+'</td></tr></table>';
			template+='</table>';
			
			tot_int = x;
			tot_expenditure = a+x;
			$('fortnight_repayment').value = fortnight_repayment.toFixed(2);
			break;
		case 2://每月
			var monthly_repayment;
			if(y !=0)
			{
				monthly_repayment = a*r/12 + (a*r/12)/(Math.pow((1+r/12), y) -1);
			}
			else
			{
				monthly_repayment = 0;
			}
			tot_int = monthly_repayment*y - a;
			tot_expenditure = monthly_repayment * y;
		    //还款明细
			template = '<div class="ct_cpjs"><strong>> 还款明细</strong></div><ul class="qi"><li class="sm"><span>期次</span><span>偿还利息 (￥)</span><span>偿还本金 (￥)</span><span>当期月供 (￥)</span><span>剩余本金 (￥)</span></li>';
			for (i=1; i<=y; i++)
			{
				m = (a-sum)*r/12;
				n = monthly_repayment - m;
				sum =sum + n;
				x += m;
				template += '<li><span class="cu">' + i + '期' + '</span><span>' + m.toFixed(2) + '</span><span>' + (monthly_repayment - m).toFixed(2) + '</span><span>' + monthly_repayment.toFixed(2) + '</span><span>' + (a - sum).toFixed(2) + '</span></li>';
			}
			$('monthly_repayment').value = monthly_repayment.toFixed(2);
			break;
		case 3://mei ji
			quarter_repayment = a*r/4 + (a*r/4)/(Math.pow((1+r/4), y/3) -1);
			tot_int = quarter_repayment*y/3 - a;
			tot_expenditure = quarter_repayment*y/3;
			
			template='<table class="tab-results"><caption>\u8fd8\u6b3e\u660e\u7ec6</caption><tr><th>'+'\u671f\u6b21'+'</th><th>'+'\u507f\u8fd8\u5229\u606f'+'</th><th>'+'\u507f\u8fd8\u672c\u91d1'+'</th><th>'+'\u8fd8\u6b3e\u989d'+'</th><th>'+'\u5269\u4f59\u672c\u91d1'+'</th></tr>';
			for (i=1; i<=y/3; i++)
			{
				m = (a-sum)*r/4;
				n = quarter_repayment - m;
				sum =sum + n;
				x += m;
				template += '<tr><td class="text_center th_sml">'+i+'\u671f'+'</td><td class="text_center">'+m.toFixed(2)+'\u5143'+'</td><td class="text_center">'+(quarter_repayment-m).toFixed(2)+'\u5143'+'</td><td class="text_center">'+quarter_repayment.toFixed(2)+'\u5143'+'</td><td class="text_center">'+(a-sum).toFixed(2)+'\u5143'+'</td></tr>';
			}
			$('quarter_repayment').value = quarter_repayment.toFixed(2);
			
			break;
		case 4://yi ci xing
			onetime_repayment = a*(1+r*y/12);
			tot_int = a*r*y/12;
			tot_expenditure = onetime_repayment;
			$('onetime_repayment').value = onetime_repayment.toFixed(2);
	}
	$('tot_int').value = tot_int.toFixed(2);                //支付利息
	$('tot_expenditure').value = tot_expenditure.toFixed(2);//还款总额
	var result = 
		{
			"fortnight_repayment":fortnight_repayment,
			"monthly_repayment":monthly_repayment,
			"quarter_repayment":quarter_repayment,
			"onetime_repayment":onetime_repayment,
			"tot_int":tot_int,
			"tot_expenditure":tot_expenditure,
			"template":template,
			"w":w
		}
	return(result);
}

function CalcByPrincipal(a, y, r, f) //deng e ben jin
{
	/*
	 * a:	dai kuan jin e
	 * y:	qi xian (yue)
	 * t:	qi qiu dai mo qi qi xian (yue)
	 * r:	li lv
	 * f:	huan kuan pin lv
	 * p:	chang huan li xi
	 * n:	mei qi chang huan de ben jin
	 * x:	
	 * sum:	li xi zhi chu
	 */
	 var tot_int;
	var tot_expenditure;
	var x = 0;
	var sum = 0;
	var template = '';
	var u;
	var u1;
	
	switch (f)
	{
		case 1:
			template='<table class="tab-results"><caption>\u8fd8\u6b3e\u660e\u7ec6</caption><tr><th>'+'\u671f\u6b21'+'</th><th>'+'\u507f\u8fd8\u5229\u606f'+'</th><th>'+'\u507f\u8fd8\u672c\u91d1'+'</h><th>'+'\u5f53\u671f\u6708\u4f9b'+'</th><th>'+'\u5269\u4f59\u672c\u91d1'+'</th></tr>';
			for (i=1; i<=(y/12)*26; i++)
			{
				p = (a-x)*r/26;								//chang huan li xi
				sum += (a-x)*r/26;							//li xi zhi chu
				u = a/((y/12)*26) + (a-x)*r/26; 			//dang qi yue gong
				q = u -p;													//chang huan ben jin
				x += a/((y/12)*26);
				z = a-x;											//sheng yu ben jin
				template += '<tr><td class="text_center th_sml">'+i+'\u671f'+'</td><td class="text_center">'+p.toFixed(2)+'\u5143'+'</td><td class="text_center">'+q.toFixed(2)+'\u5143'+'</td><td class="text_center">'+u.toFixed(2)+'\u5143'+'</td><td class="text_center">'+z.toFixed(2)+'\u5143'+'</td></tr>'
			}
			template+='</table>';
			tot_int = sum;
			tot_expenditure = a+ tot_int;
			break;
		case 2:
			template='<table class="tab-results"><caption>\u8fd8\u6b3e\u660e\u7ec6</caption><tr><th>'+'\u671f\u6b21'+'</th><th>'+'\u507f\u8fd8\u5229\u606f'+'</th><th>'+'\u507f\u8fd8\u672c\u91d1'+'</th><th>'+'\u5f53\u671f\u6708\u4f9b'+'</th><th>'+'\u5269\u4f59\u672c\u91d1'+'</th></tr>';
			for (i=1; i<=y; i++)
			{
				p = (a-x)*r/12;								//chang huan li xi
				sum += (a-x)*r/12;							//li xi zhi chu
				u = a/y + (a-x)*r/12; 			//dang qi yue gong
				q = u -p;													//chang huan ben jin
				x += a/y;
				z = a-x;											//sheng yu ben jin
				template += '<tr><td class="text_center th_sml">'+i+'\u6708'+'</td><td class="text_center">'+p.toFixed(2)+'\u5143'+'</td><td class="text_center">'+q.toFixed(2)+'\u5143'+'</td><td class="text_center">'+u.toFixed(2)+'\u5143'+'</td><td class="text_center">'+z.toFixed(2)+'\u5143'+'</td></tr>'
			}
			template+='</table>';
			tot_int = sum;
			tot_expenditure = a+ tot_int;
			u1 = a/y + a*r/12
			break;
		case 3:
			template='<table class="tab-results"><caption>\u8fd8\u6b3e\u660e\u7ec6</caption><tr><th>'+'\u671f\u6b21'+'</th><th>'+'\u507f\u8fd8\u5229\u606f'+'</th><th>'+'\u507f\u8fd8\u672c\u91d1'+'</th><th>'+'\u5f53\u671f\u6708\u4f9b'+'</th><th>'+'\u5269\u4f59\u672c\u91d1'+'</th></tr>';
			for (i=1; i<=y/3; i++)
			{
				p = (a-x)*r/4;								//chang huan li xi
				sum += (a-x)*r/4;							//li xi zhi chu
				u = a/(y/3) + (a-x)*r/4; 			//dang qi yue gong
				q = u -p;													//chang huan ben jin
				x += a/(y/3);
				z = a-x;											//sheng yu ben jin
				template += '<tr><td class="text_center th_sml">'+i+'\u671f'+'</td><td class="text_center">'+p.toFixed(2)+'\u5143'+'</td><td class="text_center">'+q.toFixed(2)+'\u5143'+'</td><td class="text_center">'+u.toFixed(2)+'\u5143'+'</td><td class="text_center">'+z.toFixed(2)+'\u5143'+'</td></tr>'
			}
			template+='</table>';
			tot_int = sum;
			tot_expenditure = a+ tot_int;
			break;
		case 4:
			tot_int = a*r*y/12;
			tot_expenditure = a*(1+r*y/12);
			break;
	}
	$('tot_int').value = tot_int.toFixed(2);
	$('tot_expenditure').value = tot_expenditure.toFixed(2);
	var result = 
		{
			"tot_int":tot_int,
			"tot_expenditure":tot_expenditure,
			"template":template,
			"u1":u1,
			"u":u
		}
	return(result);
}

function PricingConverto(type , v)
{
	if(v == '')
	{
		alert('\u8bf7\u586b\u5199\u8981\u8f6c\u6362\u7684\u6570\u5b57!');
		return;
	}
	if(!isnumeric(v))
	{
		alert('\u8bf7\u8f93\u5165\u6570\u5b57!');
		return;
	}
	RealMeans = means/100;
	
	goldChange = 31.1035;
	if(type == 'toRmb')
	{
		Converto = v*RealMeans/goldChange;
		$('Gold_Rmb_1').value = Converto.toFixed(2);
	}
	else if (type == 'toEUR')
	{
		Converto = v*goldChange/RealMeans;
		$('Gold_EUR_2').value = Converto.toFixed(2);
	}
}