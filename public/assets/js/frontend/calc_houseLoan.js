function changeBD(value, bd1, bd2, bd3) {
    if (value == 1) {
        document.getElementById(bd1).style.display = ''; //show
        document.getElementById(bd2).style.display = 'none'; //
        document.getElementById(bd3).style.display = 'none'; //
    }
    else {
        document.getElementById(bd1).style.display = 'none'; //
        document.getElementById(bd2).style.display = ''; //show
        document.getElementById(bd3).style.display = 'none'; //
    }
}

function GetLoanRate() {
    var GetLoanRateUrl = '/calc/getLoanRate';
    if ($F('year') != '') {
        var pars = '&year=' + $F('year');
    }
    else {
        return;
    }
    var myAjax = new Ajax.Request(GetLoanRateUrl, { method: 'get', parameters: pars, onComplete: setLoanRate });
}

function setLoanRate(AjaxLoanRate) {
    var LoanRate = eval('(' + AjaxLoanRate.responseText + ')');
    if ($('com_rate') != null) {
        $('com_rate').value = LoanRate.com_rate;
    }
    if ($('fund_rate') != null) {
        $('fund_rate').value = LoanRate.fund_rate;
    }
}

function houseLoanCalc(flag) {

    var average_monthly;
    var pay_int;
    var repay_total;
    var int_expenditure;
    var average_monthly;
    var repay_total_2;
    var details = parseFloat($F('details'));    //显示明细
    var g;
    var count = 0;
    
    
    if ($F('type') == 1) {
        if (!CheckElem($('com_rate'), "贷款月息")) count++;
        if (!IsIntAmountCheck($F('com_rate'), $('com_rate'), '3', "贷款月息")) count++;
        if (!CheckElem($('amount'), "贷款金额")) count++;
        if (!IsIntAmountCheck($F('amount') * 10000, $('amount'), '1', "贷款金额")) count++;
        g = parseFloat($F('com_rate')) / 100 * 12 / 10;	//dai kuan li lv
    }else {
        if (!CheckElem($('amount'), "公积金贷款金额")) count++;
        if (!IsIntAmountCheck($F('amount') * 10000, $('amount'), '4', "公积金贷款金额")) count++;
        if (!CheckElem($('fund_rate'), "公积金贷款利率")) count++;
        if (!IsIntAmountCheck($F('fund_rate'), $F('fund_rate'), '3', "公积金贷款利率")) count++;
        g = parseFloat($F('fund_rate')) / 100;	//dai kuan li lv
    }
    if (!CheckElem($('year'), "贷款年限")) count++;
    if (!IsIntYear($('year'), '', "贷款年限")) count++;
    if (count > 0) return false;

    var c = $F('type');		        //还款方式
    var d = parseFloat($F('year'));	//贷款年数
    var e = d * 12;				    //还款期数
    var f = parseFloat($F('amount')) * 10000;	//贷款金额
    if (c == 1)//等额本息还款
    {
        //显示月均还款
        $('mPayments').style.display = '';

        //yue jun huan kuan g*f/12+g*f/(Math.pow((1+g), e)-1);
        monthly_repayment = g * f / 12 + (g * f / 12) / (Math.pow((1 + g / 12), e) - 1);
        //zhi fu li xi 
        pay_int = monthly_repayment * e - f;
        //huan kuan zong e
        repay_total = monthly_repayment * e;

        if (flag) {
            var template = "月均还款：" + monthly_repayment.toFixed(2) + '\n';
            template += "支付利息：" + pay_int.toFixed(2) + '\n';
            template += "还款总额：" + repay_total.toFixed(2) + '\n';
            alert(template);
        }
        else {
            var result = CalcByIntrest(f, e, g, 2);
        }
    }
    else {//等额本金还款

        //月均还款不显示
       $('mPayments').style.display = 'none';
        var x = 0;
        var sum = 0;
        template = '<p class="rong margintop20"><span class="fontsize18" style="color:#333333;">还款明细：</span></p> <ul class="qi"><li class="sm"><span>期次</span><span>偿还利息 (￥)</span><span>偿还本金 (￥)</span><span>当期月供 (￥)</span><span>剩余本金 (￥)</span></li>';//还款明细
        for (i = 1; i <= e; i++) {//f:贷款金额 x:0 g:贷款利率
            p = (f - x) * g / 12;				//偿还利息
            sum += (f - x) * g / 12;	        //利息支出
            y = f / e + (f - x) * g / 12; 		//当期月供
            q = y - p;					//偿还本金
            x += f / e;
            z = f - x;						//剩余本金
            template += '<li><span class="cu">' + i + '期' + '</span><span>' + p.toFixed(2) + '</span><span>' + q.toFixed(2) + '</span><span>' + y.toFixed(2) + '</span><span>' + z.toFixed(2) + '</span></li>';
        }
        template += '</ul>';
        $('infos').innerHTML = template;

        int_expenditure = sum;
        repay_total_2 = f + int_expenditure;
        $('tot_int').value = int_expenditure.toFixed(2);                //支付利息
        $('tot_expenditure').value = repay_total_2.toFixed(2);//还款总额

        if (flag) {
            var template = "利息支出：" + int_expenditure.toFixed(2) + '\n';
            template += "还款总额：" + repay_total_2.toFixed(2) + '\n';
            alert(template);
        }
        else {
            //$('int_expenditure').value = int_expenditure.toFixed(2);
            //$('repay_total_2').value = repay_total_2.toFixed(2);
        }
    }

    if (details == 1) {
        if (c == 1) {
            $('infos').innerHTML = result.template;
        }
        else {
            $('infos').innerHTML = template;
        }
        $('infos').style.display = '';
    }
    else {
        $('infos').innerHTML = '';
        $('infos').style.display = 'none';
    }
}


function portfolioLoanCalc() {
    if (!CheckElem($('area'), "\u623f\u5c4b\u9762\u79ef")) return false;
    if (!CheckElem($('price'), "\u623f\u5c4b\u5355\u4ef7")) return false;
    //if(!IsIntAmount($F('price'), "1", "\u623f\u5c4b\u5355\u4ef7")) return false;
    if (!CheckElem($('year'), "\u8d37\u6b3e\u5e74\u9650")) return false;
    if (!IsIntYear($('year'), '', "\u8d37\u6b3e\u5e74\u9650")) return false;
    if (!CheckElem($('com_amount'), "\u5546\u4e1a\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!IsIntAmount($F('com_amount') * 10000, '1', "\u5546\u4e1a\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!CheckElem($('com_rate'), "\u5546\u4e1a\u8d37\u6b3e\u5229\u7387")) return false;
    if (!IsIntAmount($F('com_rate'), '3', "\u5546\u4e1a\u8d37\u6b3e\u5229\u7387")) return false;
    if (!CheckElem($('fund_amount'), "\u516c\u79ef\u91d1\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!IsIntAmount($F('fund_amount') * 10000, '4', "\u516c\u79ef\u91d1\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!CheckElem($('fund_rate'), "\u516c\u79ef\u91d1\u8d37\u6b3e\u5229\u7387")) return false;
    if (!IsIntAmount($F('fund_rate'), '3', "\u516c\u79ef\u91d1\u8d37\u6b3e\u5229\u7387")) return false;

    var a = $F('area'); 		//fang wu mian ji 
    var b = $F('price');		//fang wu dan jia
    var c = $F('ways');		//huan kuan fang shi
    var d = $F('year');		//dai kuan qi xian
    var e = d * 12;				//dai kuan zong yue shu
    var f = $F('com_amount') * 10000;	//shang dai dai kuan jin e
    var i = $F('fund_amount') * 10000;	//gong ji jin dai kuan jin e
    var g = $F('com_rate') / 1200;	//dai kuan yue li lv
    var h = $F('fund_rate') / 1200;	//dai kuan yue li lv
    if (a * b < f + i) {
        alert("\u8d37\u6b3e\u603b\u989d(\u5546\u8d37\u4e0e\u516c\u79ef\u91d1\u8d37\u6b3e\u4e4b\u548c)\u4e0d\u80fd\u5927\u4e8e\u623f\u6b3e\u603b\u989d!");
        return false;
    }
    //fang kuan zong e
    house_total = a * b;
    //dai kuan zong e
    loan_total = f + i;
    //shou qi fu kuan
    first_payments = house_total - loan_total;
    if (c == 1) {
        //yue jun huan kuan
        com_average_monthly = g * f + g * f / (Math.pow((1 + g), e) - 1);
        fund_average_monthly = h * i + h * i / (Math.pow((1 + h), e) - 1);
        //zhi fu li xi 
        com_pay_int = com_average_monthly * e - f;
        fund_pay_int = fund_average_monthly * e - i;
        //huan kuan zong e
        com_repay_total = com_average_monthly * e;
        fund_repay_total = fund_average_monthly * e;

        $('house_total').value = house_total;
        $('loan_total').value = loan_total;
        $('first_payments').value = first_payments;

        $('com_average_monthly').value = com_average_monthly.toFixed(2);
        $('fund_average_monthly').value = fund_average_monthly.toFixed(2);
        $('com_pay_int').value = com_pay_int.toFixed(2);
        $('fund_pay_int').value = fund_pay_int.toFixed(2);
        $('com_repay_total').value = com_repay_total.toFixed(2);
        $('fund_repay_total').value = fund_repay_total.toFixed(2);
    }
    else {
        com_y = f / e + f * g;//li xi zhi chu
        fund_y = i / e + i * h;
        com_x = 0;
        com_sum = 0;
        fund_x = 0;
        fund_sum = 0;

        template = '<table class="tab-results"><tr><td colspan="5" class="text_center">\u8fd8\u6b3e\u660e\u7ec6</td></tr><tr><th>' + '\u671f\u6b21' + '</th><th>' + '\u5546\u8d37\u5f53\u671f\u6708\u4f9b' + '</th><th>' + '\u516c\u79ef\u91d1\u5f53\u671f\u6708\u4f9b' + '</th><th>' + '\u5408\u8ba1' + '</th><th>' + '\u5269\u4f59\u672c\u91d1' + '</th></tr>';
        for (k = 1; k <= e; k++) {
            com_sum += (f - com_x) * g;
            com_y = f / e + (f - com_x) * g;
            com_x += f / e;
            com_z = f - com_x;

            fund_sum += (i - fund_x) * h;
            fund_y = i / e + (i - fund_x) * h;
            fund_x += i / e;
            fund_z = i - fund_x;
            tot = com_y + fund_y;
            z = com_z + fund_z;
            template += '<tr><td class="text_center th_sml">' + k + '\u6708' + '</td><td class="text_center">' + com_y.toFixed(2) + '\u5143' + '</td><td class="text_center">' + fund_y.toFixed(2) + '\u5143' + '</td><td class="text_center">' + tot.toFixed(2) + '\u5143' + '</td><td class="text_center">' + z.toFixed(2) + '\u5143' + '</td></tr>'
        }
        template += '</table>';
        $('infos').innerHTML = template;

        com_int_expenditure = com_sum;
        fund_int_expenditure = fund_sum;
        com_repay_total_2 = f + com_int_expenditure;
        fund_repay_total_2 = i + fund_int_expenditure;
        $('house_total').value = house_total;
        $('loan_total').value = loan_total;
        $('first_payments').value = first_payments;
        $('com_int_expenditure').value = com_int_expenditure.toFixed(2);
        $('fund_int_expenditure').value = fund_int_expenditure.toFixed(2);
        $('com_repay_total_2').value = com_repay_total_2.toFixed(2);
        $('fund_repay_total_2').value = fund_repay_total_2.toFixed(2);
    }
}


function BuyHousePlanCalc() {
    var after_year = parseFloat($F('after_year'));
    var yield = parseFloat($F('yield')) / 100;
    var total_price = parseFloat($F('total_price')) * 10000;
    var loan_ways = parseFloat($F('loan_ways'));
    var rate = parseFloat($F('rate')) / 100;
    var term = parseFloat($F('term')) * 12;
    var pay_ways = parseFloat($F('pay_ways'));
    var per = parseFloat($F('per')) / 10;
    var details = parseFloat($F('details'));

    if (!CheckElem($('after_year'), "\u60a8\u6253\u7b97\u51e0\u5e74\u540e\u4e70\u4e00\u5957\u4f4f\u623f")) return false;
    if (!IsIntYear($('after_year'), '', "\u60a8\u6253\u7b97\u51e0\u5e74\u540e\u4e70\u4e00\u5957\u4f4f\u623f")) return false;
    if (!CheckElem($('total_price'), "\u603b\u623f\u4ef7")) return false;
    if (!IsIntAmount($F('total_price') * 10000, '2', "\u603b\u623f\u4ef7")) return false;
    if (!CheckElem($('yield'), "\u60a8\u7684\u9884\u671f\u6708\u6295\u8d44\u6536\u76ca\u7387")) return false;
    if (!CheckElem($('term'), "\u8d37\u6b3e\u671f\u9650")) return false;
    if (!IsIntYear($('term'), '', "\u8d37\u6b3e\u671f\u9650")) return false;
    if (!CheckElem($('rate'), "\u8d37\u6b3e\u5e74\u5229\u7387")) return false;
    if (!IsIntAmount($F('rate'), '3', "\u8d37\u6b3e\u5e74\u5229\u7387")) return false;

    var result;
    var frequency = parseFloat($F('frequency'));
    switch (frequency) {
        case 1:
            $('fortnight').style.display = "";
            $('monthly').style.display = "none";
            $('quarter').style.display = "none";
            break;
        case 2:
            $('fortnight').style.display = "none";
            $('monthly').style.display = "";
            $('quarter').style.display = "none";
            break;
        case 3:
            $('fortnight').style.display = "none";
            $('monthly').style.display = "none";
            $('quarter').style.display = "";
            break;
    }
    var loan_total = total_price * per;
    var first_payment = total_price - loan_total;
    var monthly_investment = 0;
    if (after_year == 0) {
        monthly_investment = 0;
    }
    else {
        monthly_investment = first_payment * yield/(Math.pow((1+yield), after_year*12) -1)*(1+yield);

    }
    $('loan_total').value = loan_total.toFixed(2);
    $('first_payment').value = first_payment.toFixed(2);
    $('monthly_investment').value = monthly_investment.toFixed(2);

    if (pay_ways == 1)//deng e ben xi
    {
        result = CalcByIntrest(loan_total, term, rate, frequency);
    }
    else {
        $('fortnight').style.display = "none";
        $('monthly').style.display = "none";
        $('quarter').style.display = "none";
        result = CalcByPrincipal(loan_total, term, rate, frequency);
    }

    if (details == 1) {
        $('infos').innerHTML = result.template;
        $('infos').style.display = '';
    }
    else {
        $('infos').innerHTML = '';
        $('infos').style.display = 'none';
    }

}

function RepaymentComparison() {
    if (!CheckElem($('amount'), "\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!IsIntAmount($F('amount') * 10000, '1', "\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!CheckElem($('year'), "\u8d37\u6b3e\u5e74\u9650")) return false;
    if (!IsIntYear($('year'), '', "\u8d37\u6b3e\u5e74\u9650")) return false;
    if (!CheckElem($('com_rate'), "\u8d37\u6b3e\u5229\u7387")) return false;
    if (!IsIntAmount($F('com_rate'), '3', "\u8d37\u6b3e\u5229\u7387")) return false;

    var amount = parseFloat($F('amount')) * 10000;
    var year = parseFloat($F('year')) * 12;
    var com_rate = parseFloat($F('com_rate')) / 100;
    var result1;
    var result2;
    var result3;
    result1 = CalcByIntrest(amount, year, com_rate, 1); //shuang zhou gong
    $('fortnight_repayment').innerHTML = (result1.fortnight_repayment).toFixed(2);
    $('fortnight_repayment_1').innerHTML = ((result1.w) * (1 + com_rate / 26)).toFixed(2);
    $('tot_expenditure_1').innerHTML = result1.tot_expenditure.toFixed(2);

    result2 = CalcByIntrest(amount, year, com_rate, 2); //yue gong
    $('monthly_repayment').innerHTML = result2.monthly_repayment.toFixed(2);
    $('monthly_repayment_1').innerHTML = result2.monthly_repayment.toFixed(2);
    $('tot_expenditure_2').innerHTML = result2.tot_expenditure.toFixed(2);

    result3 = CalcByPrincipal(amount, year, com_rate, 2);//deng e ben jin
    $('first_repayment').innerHTML = result3.u1.toFixed(2);
    $('last_repayment').innerHTML = result3.u.toFixed(2);
    $('tot_expenditure_0').innerHTML = result3.tot_expenditure.toFixed(2);
}

function clearHTML() {
    var array = new Array('fortnight_repayment', 'fortnight_repayment_1', 'tot_expenditure_1', 'monthly_repayment', 'monthly_repayment_1', 'tot_expenditure_2', 'first_repayment', 'last_repayment', 'tot_expenditure_0');
    array.each(function (id) { $(id).innerHTML = '' });
}


function BalloonLoanCalc() {
    if (!CheckElem($('amount'), "\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!IsIntAmount($F('amount') * 10000, '1', "\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!CheckElem($('year'), "\u8ba1\u7b97\u8fd8\u6b3e\u65f6\u6240\u7528\u671f\u9650")) return false;
    if (!IsIntYear($('year'), '', "\u8ba1\u7b97\u8fd8\u6b3e\u65f6\u6240\u7528\u671f\u9650")) return false;
    if (!CheckElem($('term'), "\u8d37\u6b3e\u5229\u7387")) return false;
    if (!IsIntYear($('term'), '', "\u8d37\u6b3e\u5229\u7387")) return false;
    if (!CheckElem($('com_rate'), "\u8d37\u6b3e\u5229\u7387")) return false;
    if (!IsIntAmount($F('com_rate'), '3', "\u8d37\u6b3e\u5229\u7387")) return false;


    var a = parseFloat($F('amount')) * 10000;
    var y = parseFloat($F('year')) * 12;
    var term = parseFloat($F('term')) * 12;
    var r = parseFloat($F('com_rate')) / 100;
    var details = parseFloat($F('details'));
    var x = 0;
    var sum = 0;

    monthly_repayment = a * r / 12 + (a * r / 12) / (Math.pow((1 + r / 12), y) - 1);

    template = '<table class="tab-results"><tr><td colspan="5" class="text_center">\u8fd8\u6b3e\u660e\u7ec6</td></tr><tr><th>' + '\u671f\u6b21' + '</th><th>' + '\u507f\u8fd8\u5229\u606f' + '</th><th>' + '\u507f\u8fd8\u672c\u91d1' + '</th><th>' + '\u8fd8\u6b3e\u989d' + '</th><th>' + '\u5269\u4f59\u672c\u91d1' + '</th></tr>';
    for (i = 1; i <= term - 1; i++) {
        m = (a - sum) * r / 12;
        n = monthly_repayment - m;
        sum = sum + n;
        x += m;
        template += '<tr><td class="text_center th_sml">' + i + '\u671f' + '</td><td class="text_center">' + m.toFixed(2) + '\u5143' + '</td><td class="text_center">' + (monthly_repayment - m).toFixed(2) + '\u5143' + '</td><td class="text_center">' + monthly_repayment.toFixed(2) + '\u5143' + '</td><td class="text_center">' + (a - sum).toFixed(2) + '\u5143' + '</td></tr>';
    }
    template += '<tr><td class="text_center th_sml">' + i + '\u671f' + '</td><td class="text_center">' + ((a - sum) * r / 12).toFixed(2) + '\u5143' + '</td><td class="text_center">' + (a - sum).toFixed(2) + '\u5143' + '</td><td class="text_center">' + ((a - sum) * r / 12 + (a - sum)).toFixed(2) + '\u5143' + '</td><td class="text_center">' + 0 + '\u5143' + '</td></tr></table>';
    $('last_month_repayment').value = (a - sum).toFixed(2);
    $('interest_tot').value = (x + (a - sum) * r / 12).toFixed(2);
    $('monthly_repayment').value = monthly_repayment.toFixed(2);
    if ($F('details') == 1) {
        $('infos').style.display = '';
        $('infos').innerHTML = template;
    }
    else {
        $('infos').style.display = 'none';
    }
}


function providentFundLoanCalc() {
    if (!CheckElem($('personal_deposits'), "\u4e2a\u4eba\u6708\u7f34\u5b58\u989d")) return false;
    if (!CheckElem($('personal_ratio'), "\u4e2a\u4eba\u7f34\u5b58\u6bd4\u4f8b")) return false;
    if (!IsIntAmount($F('personal_ratio'), '3', "\u4e2a\u4eba\u7f34\u5b58\u6bd4\u4f8b")) return false;
    if (!CheckIsNaN($('spouses_deposits'), "\u914d\u5076\u6708\u7f34\u5b58\u989d")) return false;
    if ($('spouses_deposits') != '') {
        if (!CheckElem($('spouses_ratio'), "\u914d\u5076\u7f34\u5b58\u6bd4\u4f8b")) return false;
        if (!IsIntAmount($F('spouses_ratio'), '3', "\u914d\u5076\u7f34\u5b58\u6bd4\u4f8b")) return false;
    }
    if (!CheckIsNaN($('spouses_ratio'), "\u914d\u5076\u7f34\u5b58\u6bd4\u4f8b")) return false;
    if (!CheckElem($('amount'), "\u623f\u5c4b\u8bc4\u4f30\u4ef7\u503c\u6216\u5b9e\u9645\u8d2d\u623f\u6b3e")) return false;
    if (!IsIntAmount($F('amount') * 10000, "2", "\u623f\u5c4b\u8bc4\u4f30\u4ef7\u503c\u6216\u5b9e\u9645\u8d2d\u623f\u6b3e")) return false;
    if (!CheckElem($('years'), "\u8d37\u6b3e\u7533\u8bf7\u5e74\u9650")) return false;
    if (!IsIntYear($('years'), '', "\u8d37\u6b3e\u7533\u8bf7\u5e74\u9650")) return false;

    personal_deposits = parseFloat($F('personal_deposits'));		//ben ren yue jiao cun e
    personal_ratio = parseFloat($F('personal_ratio') / 100);	//ben ren yue jiao bi li
    spouses_deposits = $('spouses_deposits').value; //pei ou yue jiao cun e 
    spouses_ratio = parseFloat($F('spouses_ratio') / 100);	//pei ou yue jiao cun bi li 
    amount = parseFloat($F('amount') * 10000);	//gou fang kuan
    years = parseFloat($F('years'));	//dai kuan shen qing nian xian
    if ($('credit_level_1').checked == true) {
        credit_level = 1.3;
    }
    else if ($('credit_level_2').checked == true) {
        credit_level = 1.15;
    }
    else {
        credit_level = 1;
    }

    if ($('housing_nature_1').checked == true) {
        housing_nature = 0.9;
    }
    else {
        housing_nature = 0.8;
    }

    if (spouses_deposits != '' && spouses_ratio != '') {
        jtysr = Math.ceil(personal_deposits / personal_ratio + spouses_deposits / spouses_ratio);
    }
    else {
        jtysr = Math.ceil(personal_deposits / personal_ratio);
    }

    if (jtysr <= 400) {
        alert('\u5bb6\u5ead\u6708\u6536\u5165\u4f4e\u4e8e400\uff0c\u4e0d\u7b26\u5408\u8d37\u6b3e\u6761\u4ef6');
        return;
    }
    LoansCoefficient(years);

    provident_A = Math.min(Math.round((jtysr - 400) * 10000 / LC), 400000);
    provident_B = Math.round(provident_A * credit_level);
    provident_C = Math.round(amount * housing_nature);
    provident_D = Math.min(provident_B, provident_C);
    $('provident').value = (provident_D / 10000).toFixed(2);
}

function LoansCoefficient(v) {
    switch (v) {
        case 1: LC = 852.14; break;
        case 2: LC = 434.87; break;
        case 3: LC = 295.86; break;
        case 4: LC = 226.42; break;
        case 5: LC = 184.80; break;
        case 6: LC = 159.15; break;
        case 7: LC = 139.42; break;
        case 8: LC = 124.66; break;
        case 9: LC = 113.21; break;
        case 10: LC = 104.07; break;
        case 11: LC = 96.63; break;
        case 12: LC = 90.45; break;
        case 13: LC = 85.24; break;
        case 14: LC = 80.79; break;
        case 15: LC = 76.96; break;
        case 16: LC = 73.62; break;
        case 17: LC = 70.70; break;
        case 18: LC = 68.11; break;
        case 19: LC = 65.81; break;
        case 20: LC = 63.75; break;
        case 21: LC = 61.90; break;
        case 22: LC = 60.24; break;
        case 23: LC = 58.72; break;
        case 24: LC = 57.35; break;
        case 25: LC = 56.10; break;
        case 26: LC = 54.95; break;
        case 27: LC = 53.89; break;
        case 28: LC = 52.92; break;
        case 29: LC = 52.03; break;
        case 30: LC = 51.20; break;
    }
    return LC;
}

function Loan() {
    $('bank_id').length = 0;
    $('area_id').options.add(new Option('\u8bf7\u9009\u62e9', '0'));
    getLoan(AllLoan.info);
}

function getAllLoan() {
    InitConfigGold('', '/calc/getMortgageVerify');
    AllLoan = Temp;
}

function getLoan(Ob) {
    for (areaid in Ob) {
        arealength = $('area_id').length;
        Flag = 0;
        for (i = 0; i < arealength; i++) {
            if ($('area_id').options[i].value == areaid) {
                Flag = 1;
            }
        }
        if (Flag == 0) {
            $('area_id').options.add(new Option(AllLoan.area[areaid], areaid));
        }
    }
}

function setLoanIns() {
    ob = $('bank_id');
    loanArray = AllLoan.info[$F('area_id')];
    ob.length = 0;
    ob.options.add(new Option('\u8bf7\u9009\u62e9', '0'));//default value
    for (key in loanArray) {
        ob.options.add(new Option(AllLoan.bank[key], key));
    }
}

function LateRepaymentCalc() {
    if ($F('area_id') == 0) { alert('\u8bf7\u9009\u62e9\u5730\u533a'); return false; }
    if ($F('bank_id') == 0) { alert('\u8bf7\u9009\u62e9\u94f6\u884c'); return false; }
    if (!CheckElem($('rate'), "\u8d37\u6b3e\u5229\u7387")) return false;
    if (!IsIntAmount($F('rate'), '3', "\u8d37\u6b3e\u5229\u7387")) return false;
    if (!CheckElem($('per_reapay'), "\u8d37\u6b3e\u6bcf\u671f\u8fd8\u6b3e\u989d")) return false;
    if (!CheckElem($('days'), "\u903e\u671f\u8fd8\u6b3e\u5929\u6570")) return false;
    a = parseFloat($F('rate')) / 100;
    b = parseFloat($F('per_reapay'));
    c = parseFloat($F('days'));
    frequency = parseFloat($F('frequency'));
    var fee;
    switch (frequency) {
        case 1:
            d = 14;
            fee = lateRepay(a, b, c, d);
            break;
        case 2:
            d = 30;
            fee = lateRepay(a, b, c, d);
            break;
        case 3:
            d = 90;
            fee = lateRepay(a, b, c, d);
            break;
        case 4:
            d = c;
            fee = lateRepay(a, b, c, d);
            break;
    }

    $('repayment_fee_min').value = fee.r_min.toFixed(2);
    $('repayment_fee_max').value = fee.r_max.toFixed(2);
}

function lateRepay(a, b, days, d) {
    var min = AllLoan.info[$F('area_id')][$F('bank_id')].min;
    var max = AllLoan.info[$F('area_id')][$F('bank_id')].max;
    var r_min = 0;
    var r_max = 0;
    if (days >= d) {
        for (i = 0; i < days / d; i++) {
            r_min += b * (1 + min) * a * (days - i * d);
            r_max += b * (1 + max) * a * (days - i * d);
        }
    }
    else {
        r_min = b * (1 + min) * a * c;
        r_max = b * (1 + max) * a * c;
    }
    var result =
			{
			    "r_min": r_min / 360,
			    "r_max": r_max / 360
			}
    return (result);
}


function BiweeklyCalc() {
    if (!CheckElem($('amount'), "\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!IsIntAmount($F('amount'), '1', "\u8d37\u6b3e\u91d1\u989d")) return false;
    if (!CheckElem($('year'), "\u8d37\u6b3e\u5e74\u9650")) return false;
    if (!IsIntYear($('year'), '', "\u8d37\u6b3e\u5e74\u9650")) return false;
    if (!CheckElem($('com_rate'), "\u8d37\u6b3e\u5229\u7387")) return false;
    if (!IsIntAmount($F('com_rate'), '3', "\u8d37\u6b3e\u5229\u7387")) return false;
    var Intrest;
    var t = parseFloat($F('amount')) * 10000;
    var b = parseFloat($F('year')) * 12;
    var r = parseFloat($F('com_rate')) / 100;
    var details = parseFloat($F('details'));

    Intrest = CalcByIntrest(t, b, r, 2);
    var sum = 0;
    var x = 0;
    template = '<table align="left" style="margin-left:20px; width:300px"><tr><td class="text_center">' + '\u5e74\u9650' + '</td><td class="text_center">' + '\u7b49\u989d\u672c\u606f' + '</td></tr>';
    for (i = 1; i <= b; i++) {
        c = (t - sum) * r / 12;
        a = Intrest.monthly_repayment - c;
        sum = sum + a;
        x += c;
        if ((i % 12) == 0) {
            template += '<tr><td class="text_center th_sml">' + i / 12 + '\u5e74' + '</td><td class="text_center">' + (t - sum).toFixed(2) + '\u5143' + '</td></tr>';
        }
    }
    template += '</table>';
    $('tot_expenditure_1').value = Intrest.tot_expenditure.toFixed(2);

    Intrest = CalcByIntrest(t, b, r, 1);
    sum = 0;
    x = 0;
    template1 = '<table class="text_center"><tr><td class="text_center" width="80px">' + '\u53cc\u5468\u4f9b' + '</td><td class="text_center"></td></tr>';
    for (j = 1; j <= (b / 12) * 26; j++) {
        c = (t - sum) * r / 26;
        a = Intrest.fortnight_repayment - c;
        sum = sum + a;
        x += c;
        m = t - sum;
        if (m <= 0) {
            m = 0;
        }

        if ((j % 26) == 0) {
            template1 += '<tr><td class="text_center">' + m.toFixed(2) + '\u5143' + '</td></tr>'
        }
    }
    template1 += '</table>';

    $('tot_expenditure_2').value = Intrest.tot_expenditure.toFixed(2);
    if (details == 1) {
        $('infos').innerHTML = template + template1;
        $('benjin').style.display = '';
        $('infos').style.display = '';
    }
    else {
        $('infos').style.display = 'none';
        $('benjin').style.display = 'none';
    }
}


function ChangeDefault() {
    transactional = $F('transactional');
    v = $F('area_id');
    if (v == 2) //bei jing
    {
        if (transactional == 1) //yi shou fang
        {
            $('contract_taxes').value = 1.5;
            $('stamp_duty').value = 0.05;
            $('public_maintenance_fund').value = 2;
        }
        else {
            $('contract_taxes_buy').value = 1.5;
            $('stamp_duty_buy').value = 0.05;
            $('stamp_duty_sell').value = 0.05;
            $('personal_income_tax_sell').value = 1;
            if (($('is_property_1').checked == false && $('cate_1').checked == true) || ($('is_property_1').checked == false && $('cate_2').checked == true)) {
                $('business_tax_sell').value = 5.5;
            }
            else {
                $('business_tax_sell').value = '';
            }
        }
    }
    else if (v == 10) {
        if (transactional == 1) {
            $('contract_taxes').value = 1.5;
            $('stamp_duty').value = 0.05;
            $('public_maintenance_fund').value = 2;
        }
        else {

        }
    }
    else if (v == 279) {
        if (transactional == 1) {
            $('contract_taxes').value = 1.5;
            $('stamp_duty').value = 0.5;
            $('public_maintenance_fund').value = 0.2;
        }
        else {

        }
    }
    else if (v == 277) {
        if (transactional == 1) {
            $('contract_taxes').value = 1.5;
            $('stamp_duty').value = 0.5;
            $('public_maintenance_fund').value = 0.2;
        }
        else {

        }
    }
    else if (v == 328) {
        if (transactional == 1) {
            $('contract_taxes').value = 1.5;
            $('stamp_duty').value = 0.5;
            $('public_maintenance_fund').value = 0.2;
        }
        else {

        }
    }
    else {
        if (transactional == 1) {
            $('contract_taxes').value = 1.5;
            $('stamp_duty').value = 0.5;
            $('public_maintenance_fund').value = 0.2;
        }
        else {

        }
    }
}

function ChgtaxesAndFees() {
    if ($F('transactional') == 1) {
        $('c1').style.display = '';
        $('c2').style.display = 'none';
    }
    else {
        $('c1').style.display = 'none';
        $('c2').style.display = '';
    }
}

function taxesAndFeesCalc() {
    if (!CheckElem($('area'), "\u623f\u5c4b\u9762\u79ef")) return false;
    if (!CheckElem($('price'), "\u623f\u5c4b\u5355\u4ef7")) return false;
    if (!IsIntAmount($F('contract_taxes'), '3', "\u5951\u7a0e")) return false;
    if (!IsIntAmount($F('stamp_duty'), '3', "\u5370\u82b1\u7a0e")) return false;
    if (!IsIntAmount($F('public_maintenance_fund'), '3', "\u516c\u5171\u7ef4\u4fee\u57fa\u91d1")) return false;
    if (!IsIntAmount($F('premiums'), '3', "\u4fdd\u9669\u8d39")) return false;
    var transactional = $F('transactional');
    var area = parseFloat($F('area'));
    var price = parseFloat($F('price'));
    var t = area * price;

    if (transactional == 1) {
        var contract_taxes = parseFloat($F('contract_taxes')) / 100;
        var stamp_duty = parseFloat($F('stamp_duty')) / 100;
        var public_maintenance_fund = parseFloat($F('public_maintenance_fund')) / 100;
        var premiums = parseFloat($F('premiums')) / 100;
        var legal_fees = parseFloat($F('legal_fees'));
        var other_fees = parseFloat($F('other_fees'));

        a = t * contract_taxes;
        b = t * stamp_duty;
        c = t * public_maintenance_fund;
        d = t * premiums;
        template = '<table class="tab-results"><tr><th>' + '\u5951\u7a0e\uff1a' + '</th><td class="text_center">' + a + '\u5143</td></tr><tr><th>' + '\u5370\u82b1\u7a0e\uff1a' + '</th><td class="text_center">' + b + '\u5143</td></tr><tr><th>' + '\u516c\u5171\u7ef4\u4fee\u57fa\u91d1\uff1a' + '</th><td class="text_center">' + c + '\u5143</td></tr><tr><th>' + '\u5f8b\u5e08\u8d39\uff1a' + '</th><td class="text_center">' + d + '\u5143</td></tr><tr><th>' + '\u4fdd\u9669\u8d39\uff1a' + '</th><td class="text_center">' + Math.floor(legal_fees) + '\u5143</td></tr><tr><th>' + '\u5176\u4ed6\u8d39\u7528\uff1a' + '</th><td class="text_center">' + Math.floor(other_fees) + '\u5143</td></tr></table>'
        $('info1').innerHTML = template.replace(new RegExp('NaN', 'g'), 0);
        $('info2').style.display = 'none';
        $('info1').style.display = '';
    }
    else {
        var contract_taxes_sell = parseFloat($F('contract_taxes_sell')) / 100;
        var stamp_duty_sell = parseFloat($F('stamp_duty_sell')) / 100;
        var business_tax_sell = parseFloat($F('business_tax_sell')) / 100;
        var personal_income_tax_sell = parseFloat($F('personal_income_tax_sell')) / 100;
        var premiums_sell = parseFloat($F('premiums_sell')) / 100;
        var legal_fees_sell = parseFloat($F('legal_fees_sell'));
        var other_fees_sell = parseFloat($F('other_fees_sell'));

        var contract_taxes_buy = parseFloat($F('contract_taxes_buy')) / 100;
        var stamp_duty_buy = parseFloat($F('stamp_duty_buy')) / 100;
        var business_tax_buy = parseFloat($F('business_tax_buy')) / 100;
        var personal_income_tax_buy = parseFloat($F('personal_income_tax_buy')) / 100;
        var premiums_buy = parseFloat($F('premiums_buy')) / 100;
        var legal_fees_buy = parseFloat($F('legal_fees_buy'));
        var other_fees_buy = parseFloat($F('other_fees_buy'));
        if ($('cate_1').checked == true) {
            if ($('is_property_1').checked == true) {

            }
            else {

            }
        }
        else {
            if ($('is_property_1').checked == true) {

            }
            else {

            }
        }
        qs_sell = t * contract_taxes_sell;
        yys_sell = t * business_tax_sell;
        yhs_sell = t * stamp_duty_sell;
        gs_sell = t * personal_income_tax_sell;
        lsf_sell = legal_fees_sell;
        bxf_sell = t * premiums_sell;
        qtf_sell = other_fees_sell;

        qs_buy = t * contract_taxes_buy;
        yys_buy = t * business_tax_buy;
        yhs_buy = t * stamp_duty_buy;
        gs_buy = t * personal_income_tax_buy;
        lsf_buy = legal_fees_buy;
        bxf_buy = t * premiums_buy;
        qtf_buy = other_fees_buy;
        template = '<table class="tab-results"><tr><th>\u7a0e\u8d39\u540d\u79f0</th><th>\u5356\u65b9</th><th>\u4e70\u65b9</th></tr><tr><th>' + '\u5951\u7a0e\uff1a' + '</th><td class="text_center">' + qs_sell + '\u5143</td><td class="text_center">' + qs_buy + '\u5143</td></tr><tr><th>' + '\u5370\u82b1\u7a0e\uff1a' + '</th><td class="text_center">' + yhs_sell + '\u5143</td><td class="text_center">' + yhs_buy + '\u5143</td></tr><tr><th>' + '\u8425\u4e1a\u7a0e\uff1a' + '</th><td class="text_center">' + yys_sell + '\u5143</td><td class="text_center">' + yys_buy + '\u5143</td></tr><tr><th>' + '\u4e2a\u7a0e\uff1a' + '</h><td class="text_center">' + gs_sell + '\u5143</td><td class="text_center">' + gs_buy + '\u5143</td></tr><tr><th>' + '\u4fdd\u9669\u8d39\uff1a' + '</th><td class="text_center">' + bxf_sell + '\u5143</td><td class="text_center">' + bxf_buy + '\u5143</td></tr><tr><th>' + '\u5f8b\u5e08\u8d39\uff1a' + '</th><td class="text_center">' + lsf_sell + '\u5143</td><td class="text_center">' + lsf_buy + '\u5143</td></tr><tr><th>' + '\u5176\u4ed6\u8d39\u7528\uff1a' + '</th><td class="text_center">' + qtf_sell + '\u5143</td><td class="text_center">' + qtf_buy + '\u5143</td></tr></table>'

        $('info2').innerHTML = template.replace(new RegExp('NaN', 'g'), 0);
        $('info1').style.display = 'none';
        $('info2').style.display = '';
    }
}

function GetPerYearRate() {
    //var GetPerYearRateUrl = 'http://www.bankrate.com.cn/calc/getPerYearRate';
    var GetPerYearRateUrl = '/Count/ajaxget/getPerYearRate';
    if ($F('first_time') != '' && $F('maturity_date') != '' && $F('year') != '' && $F('amount') != '' && $F('ways') != '' && $F('cate')) {
        if ($('units_1').checked == true) {
            units = 1;
        }
        else {
            units = 2;
        }
        var pars = '&first_time=' + $F('first_time') + '&maturity_date=' + $F('maturity_date') + '&amount=' + $F('amount') + '&year=' + $F('year') + '&units=' + units + '&ways=' + $F('ways') + '&cate=' + $F('cate');
    }
    else {
        return;
    }
    //alert(pars);
    var myAjax = new Ajax.Request(GetPerYearRateUrl, { method: 'get', parameters: pars, asynchronous: false, onComplete: setPerYearRate });
}

var PerYearRate;
function setPerYearRate(AjaxPerYearRate) {
    //alert(AjaxPerYearRate.responseText);
    PerYearRate = eval('(' + AjaxPerYearRate.responseText + ')');

}


function RepayConditionCalc() {
    if (!CheckElem($('amount'), "\u8d37\u6b3e\u603b\u989d")) return false;
    if (!IsIntAmount($F('amount') * 10000, "1", "\u8d37\u6b3e\u603b\u989d")) return false;
    if (!CheckElem($('year'), "\u539f\u8d37\u6b3e\u5e74\u9650")) return false;
    var d;
    if ($('units_1').checked == true) {
        if ($F('cate') == 1) {
            d = $F('year');
            if (!IsIntYear($('year'), '2', "\u539f\u8d37\u6b3e\u671f\u9650")) return false;
        }
        else {
            d = $F('year');
            if (!IsIntYear($('year'), '1', "\u539f\u8d37\u6b3e\u671f\u9650")) return false;
        }
    }
    else {
        d = $F('year') * 12;
        if (!IsIntYear($('year'), '', "\u539f\u8d37\u6b3e\u5e74\u9650")) return false;
    }
    if (!CheckEmpty($('first_time'), "\u7b2c\u4e00\u6b21\u8fd8\u6b3e\u65f6\u95f4")) return false;
    if (!CheckEmpty($('maturity_date'), "\u67e5\u8be2\u5230\u671f\u65e5")) return false;

    var a = $F('amount') * 10000;
    var b = $F('first_time');
    var c = $F('maturity_date');
    if (Cal_strtodate(c) <= Cal_strtodate('1991-04-22')) {
        alert('\u67e5\u8be2\u7684\u8fd8\u6b3e\u65e5\u671f\u5fc5\u987b\u5927\u4e8e1991');
        return false;
    }
    var f = $F('ways');
    var m = (Cal_strtodate(c) - Cal_strtodate(b)) / (24 * 60 * 60 * 1000 * 30.416666);
    if (d < Math.round(m)) {
        alert('\u539f\u8d37\u6b3e\u671f\u9650\u5fc5\u987b\u5927\u4e8e\u7b2c\u4e00\u6b21\u8fd8\u6b3e\u65f6\u95f4\u5230\u67e5\u8be2\u5230\u671f\u65e5\u7684\u65f6\u95f4\u95f4\u9694\uff01');
    }
    else if (m <= 0) {
        alert('\u67e5\u8be2\u5230\u671f\u65e5\u5fc5\u987b\u665a\u4e8e\u7b2c\u4e00\u6b21\u8fd8\u6b3e\u65f6\u95f4');
    }
    else {
        GetPerYearRate();

        var term = PerYearRate.term; //sheng yu qi xian
        var r = PerYearRate.rate;
        $('already_repayment').value = PerYearRate.yzfhke;
        $('already_repayment_bj').value = PerYearRate.yhbj;
        $('already_repayment_int').value = PerYearRate.yhlx;
        $('remaining_bj').value = PerYearRate.sybj;

        var result;
        if (f == 1) {
            result = CalcByIntrest(PerYearRate.sybj, term, r, 2);
            $('infos').innerHTML = result.template;
            $('tab').innerHTML = '<strong>\u67e5\u8be2\u5230\u671f\u65e5\u540e\u7684\u8fd8\u6b3e\u60c5\u51b5</strong>';
            $('monthly').style.display = '';
        }
        else {
            result = CalcByPrincipal(PerYearRate.sybj, term, r, 2);
            $('infos').innerHTML = result.template;
            $('tab').innerHTML = '<strong>\u67e5\u8be2\u5230\u671f\u65e5\u540e\u7684\u8fd8\u6b3e\u60c5\u51b5</strong>';
            $('monthly').value = '';
            $('monthly').style.display = 'none';
        }
    }
}






