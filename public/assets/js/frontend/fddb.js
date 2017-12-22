function calFun(obj) {
        	var dj = $('#dj3').val();
        	var mj = $('#mj3').val();
        	if(dj==''&&mj==''){
        		$('.errorMsg').html('');
            	$('.errorMsg1').html('');
        		$('.errorMsg').html('单价不能为空!').css({color:"red"}) ;
            	$('.errorMsg1').html('面积不能为空!').css({color:"red"});
            	$('#dj3').focus();
            	$('#dj3').css('border','1px red solid');
             	$('#mj3').css('border','1px red solid');
            	return false;
        	}
        	if(dj==''){
        		$('.errorMsg').html('');
            	$('.errorMsg1').html('');
        		$('.errorMsg').html('单价不能为空!').css({color:"red"}) ;
        	   	$('#dj3').focus();
            	$('#dj3').css('border','1px red solid');
        		return false;
        	}
        	if(mj==''){
        		$('.errorMsg').html('');
            	$('.errorMsg1').html('');
        		$('.errorMsg1').html('面积不能为空!').css({color:"red"});
        	   	$('#mj3').focus();
            	$('#mj3').css('border','1px red solid');
        		return false;
        	}
            var dj3 = parseFloat(obj.dj3.value);
            var mj3 = parseFloat(obj.mj3.value);
            if(isNaN(dj3)&&isNaN(mj3)){
            	$('.errorMsg').html('');
            	$('.errorMsg1').html('');
            	$('.errorMsg').html('单价必须为数字!').css({color:"red"}) ;
            	$('.errorMsg1').html('面积必须为数字!').css({color:"red"});
         	   	$('#dj3').focus();
            	$('#dj3').css('border','1px red solid');
            	$('#mj3').css('border','1px red solid');
            	return false;
            }
            if(isNaN(dj3)){
            	$('.errorMsg').html('');
            	$('.errorMsg1').html('');
            	$('.errorMsg').html('单价必须为数字!').css({color:"red"}) ;
         	   	$('#dj3').focus();
            	$('#dj3').css('border','1px red solid');
            	return false;
            }
            if(isNaN(mj3)){
            	$('.errorMsg').html('');
            	$('.errorMsg1').html('');
            	$('.errorMsg1').html('面积必须为数字!').css({color:"red"});
         	   	$('#mj3').focus();
            	$('#mj3').css('border','1px red solid');
            	return false;
            }
            //清空
            $('.errorMsg').html('');
            $('.errorMsg1').html('');
        	$('#mj3').css('border','');
        	$('#dj3').css('border','');
            var fkz3 = dj3 * mj3;
            var yh = fkz3 * 0.0005;
            var q3, fw;
            if (dj3 <= 9432) q3 = fkz3 * 0.015;
            else if (dj3 > 9432) q3 = fkz3 * 0.03;
            if (mj3 <= 120) fw = 500;
            else if (120 < mj3 <= 5000) fw = 1500;
            if (mj3 > 5000) fw = 5000;
            var gzh = fkz3 * 0.003;
            obj.yh.value = Math.round(yh * 100, 5) / 100;
            obj.fkz3.value = Math.round(fkz3 * 100, 5) / 100;
            obj.q.value = Math.round(q3 * 100, 5) / 100;
            obj.gzh.value = Math.round(gzh * 100, 5) / 100;
            obj.wt.value = Math.round(gzh * 100, 5) / 100;
            obj.fw.value = Math.round(fw * 100, 5) / 100;
        }
