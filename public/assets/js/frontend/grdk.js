 function ChangeStyle(id, msg) {
            msg = '<span class="icon"></span>' + msg;
            $(id).css({ "border-color": "red" });
            $(id).focus();
            $(id).next("span").html(msg);
        }

        //贷款利率
        function CheckElem(elementId, msg) {
            var id = "#" + elementId;
            if (msg == null) msg = "";
            if ($(id).val() == '') {
                msg += "不能为空!";
                ChangeStyle(id, msg);
                return false;
            }
            else if (isNaN($(id).val()) || $(id).val().indexOf(" ") != -1) {
                msg += "必须为数字!";
                ChangeStyle(id, msg)
                return false;
            }
            else if ((isNaN($(id).val())) || ($(id).val() == 0)) {
                msg += "不能为零！";
                ChangeStyle(id, msg);
                return false;
            }
            else if (($(id).val() < 0)) {
                msg += "请输入正数！";
                ChangeStyle(id, msg);
                return false;
            }
            else if (($(id).val() > 100)) {
                msg += "不能大于100！";
                ChangeStyle(id, msg);
                return false;
            }
            else {
                $(id).css({ "border-color": "#b4b9bd" });
                $(id).next("span").html("");
                return true;
            }
        }

        //贷款金额
        function CheckLoanMoney(elementId, msg) {
            var id = "#" + elementId;
            if (msg == null) msg = "";
            if ($(id).val() == '') {
                msg += "不能为空!";
                ChangeStyle(id, msg)
                return false;
            }
            else if (isNaN($(id).val()) || $(id).val().indexOf(" ") != -1) {
                msg += "必须为数字!";
                ChangeStyle(id, msg)
                return false;
            }
            else if ((isNaN($(id).val())) || ($(id).val() == 0)) {
                msg += "不能为零！";
                ChangeStyle(id, msg);
                return false;
            }
            else {
                $(id).css({ "border-color": "#b4b9bd" });
                $(id).next("span").html("");
                return true;
            }
        }

        //按揭年数
        function CheckLoanYear(elementId, msg) {
            var id = "#" + elementId;
            if (msg == null) msg = "";
            if ($(id).val() == '') {
                msg += "不能为空！";
                ChangeStyle(id, msg)
                return false;
            }
            else if (isNaN($(id).val()) || $(id).val().indexOf(" ") != -1) {
                msg += "必须为数字！";
                ChangeStyle(id, msg)
                return false;
            }
            else if ($(id).val().match(/^[0-9]+$/) == null) {
                msg += "必须为整数！";
                ChangeStyle(id, msg)
                return false;
            }
            else if ((isNaN($(id).val())) || ($(id).val() == 0)) {
                msg += "不能为零！";
                ChangeStyle(id, msg);
                return false;
            }
            else {
                $(id).css({ "border-color": "#b4b9bd" });
                $(id).next("span").html("");
                return true;
            }
        }

        //计算函数，返回计算结果并显示在相应的结果项上。
        function StartCal() {
            var count = 0;
            if (!CheckElem("active", "贷款月息"))
                count++;
            if (!CheckLoanYear("yearSpan", "按揭年数"))
                count++;
            if (!CheckLoanMoney("original", "贷款总额"))
                count++;
            if (count > 0) return false;
            //从表单中取值
            var original = $("#original").val() * 10000;  //贷款总额
            var active = $("#active").val();            //贷款年利率
            var yearSpan = $("#yearSpan").val();        //按揭年数
            var repayMethod = $("#inputSelect").val();  //还款方式
            var timeSpan = parseFloat(yearSpan) * 12;   //期数
            //active = active * 10 / 12;

            if (repayMethod == "等额本息还款") {
                active = active;// * 10 / 12;
                var result = estateBorrow(original, active, timeSpan); //贷款利息、利息税额、实得利息、本息合计封在返回的数组中
                //将贷款利息本息合计显示
                $("#monthBack").val(result[0]);        //显示贷款利息
                $("#totalBack").val(result[1]);        //显示本息合计
                $("#totalInterest").val(result[3]);    //显示本息合计
                $("#tr_debx").css({ "display": "" });
                $("#details").css({ "display": "none" });
            }
            else {
                var result = CalFu(original, active, timeSpan);
                $("#totalInterest").val(result[0]);          //显示贷款利息
                $("#totalBack").val(result[1]);              //显示本息合计
                $("#details").html(result[2]);                  //还款明细
                $("#tr_debx").css({ "display": "none" });
                $("#details").css({ "display": "" });
            }
        }

        //等额本金还款计算
        function CalFu(original, active, timeSpan) {
            active = parseFloat(active) / 100;
            var monthOriginal = original / timeSpan;
            var timeSpan1 = parseInt(timeSpan);   //期数
            var interestTotal = 0;                //利息总额
            var detailsHtml = '<p class="rong margintop20"><span class="fontsize18" style="color:#333333;">还款明细：</span></p> <ul class="qi"><li class="sm"><span>期次</span><span>偿还利息 (￥)</span><span>偿还本金 (￥)</span><span>当期月供 (￥)</span><span>剩余本金 (￥)</span></li>';//还款明细
            var LoanMoney = original;       //贷款金额
            var x = 0;

            for (i = 1; i < timeSpan1 + 1; i++) {
                p = (LoanMoney - x) * active / 12;              //偿还利息
                interestTotal += (LoanMoney - x) * active / 12;         //利息支出
                y = LoanMoney / timeSpan1 + (LoanMoney - x) * active / 12;      //当期月共
                q = y - p;                  //偿还本金
                x += LoanMoney / timeSpan1;
                z = LoanMoney - x;          //剩余本金
                detailsHtml += '<li><span class="cu">' + i + '期' + '</span><span>' + p.toFixed(2) + '</span><span>' + q.toFixed(2) + '</span><span>' + y.toFixed(2) + '</span><span>' + z.toFixed(2) + '</span></li>';
            }

            detailsHtml += '</ul>';
            var momeytotal = interestTotal + original; //还款总额
            var objArray = new Array();
            objArray[0] = interestTotal.toFixed(2); //利息总额
            objArray[1] = momeytotal.toFixed(2);    //还款总额
            objArray[2] = detailsHtml;     //当月款款
            return objArray;

        }
        
        //等额本息还款计算
        function estateBorrow(original,active,timeSpan){
            var monthBack=original*active*0.001*Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))/(Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))-1);
            var totalBack=monthBack*timeSpan;
            var totalInterest=totalBack-original;
            var monthInterest=totalInterest/timeSpan;
            totalInterest=(Math.round(totalInterest*100))/100;//存款利息：取两位小数
            monthInterest=(Math.round(monthInterest*10000))/10000;//存款利息：取两位小数  
            monthBack=(Math.round(monthBack*10000))/10000;//存款利息：取两位小数
            totalBack=(Math.round(totalBack*100))/100;//本息合计：取两位小数
            var objArray=new Array();
            objArray[0]=monthBack;
            objArray[1]=totalBack;
            objArray[2]=monthInterest;
            objArray[3]=totalInterest;        
            return objArray;
        }

