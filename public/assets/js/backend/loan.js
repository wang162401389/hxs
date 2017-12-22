define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'loan/index',
                    add_url: 'loan/add',
                    edit_url: 'loan/edit',
                    del_url: 'loan/del',
                    multi_url: 'loan/multi',
                    publish_url : 'loan/publish',//发布
                    offline_url : 'loan/offline',//下线
                    table: 'loan'
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: '序号', operate: false},
                        {field: 'category.name', title: __('Type'), searchList: $.getJSON('loan/searchlist')},
                        {field: 'title', title: __('Title'), operate: 'LIKE %...%', placeholder: '模糊搜索'},
                        {field: 'limit_range', title: __('Limit'), operate: false},
                        {field: 'interest', title: '贷款利息', operate: false},
                        {field: 'loan_time', title: __('Loan_time'), operate: false},
                        {field: 'deadline_range', title: __('Deadline'), operate: false},
                        {field: 'repayment_type', title: __('Repayment_type'), formatter: Controller.api.formatter.repayment_type, searchList: {'1': '分期还款', '2': '随借随还', '3':'定期付息，到期还本'}},
                        {field: 'publish_time', title: __('Publish_time'), operate: false, formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), searchList: {'0': '未发布', '1': '已发布'}},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            buttons:[],
                            formatter:function (value, row, index) {
//                            	var that = $.extend({}, this);
//                            	var table = $(that.table).clone(true);
                                this.buttons.splice(0, this.buttons.length);
                                if(row.status == '未发布'){
                                    this.buttons.push({
                                        name: 'post',
                                        text: '发布',
                                        classname: 'btn btn-xs btn-danger btn-publish',
                                        extend : "data-url="+$.fn.bootstrapTable.defaults.extend.publish_url
                                    });
                                }else{
//                                	$(table).data("operate-edit", null);
//                                    this.buttons.push({
//                                        name: 'detail',
//                                        text: __('Detail'),
//                                        icon: 'fa fa-list',
//                                        classname: 'btn btn-info btn-xs btn-detail btn-dialog',
//                                        url: 'loan/detail'
//                                    });
                                    this.buttons.push({
                                    	name: 'post',
                                        text: '下架',
                                        classname: 'btn btn-xs btn-warning btn-offline',
                                        extend : "data-url="+$.fn.bootstrapTable.defaults.extend.offline_url
                                    });
                                }
//                                that.table = table;
                            	return Table.api.formatter.operate.call(this, value, row, index);
                            }
                        }
                    ]
                ],
                //禁用默认搜索
                search: false
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            //取消双击事件
            table.off('dbl-click-row.bs.table');
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            },
            formatter : {
            	repayment_type : function (value, row, index) {
            		var typeArr = {'1': '分期还款', '2': '随借随还', '3':'定期付息，到期还本'};
					return typeArr[value.toString()];
            	}
            }
        }
    };
    return Controller;
});