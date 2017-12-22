define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'faq/question/index',
                    add_url: 'faq/question/add',
                    edit_url: 'faq/question/edit',
                    del_url: 'faq/question/del',
                    multi_url: 'faq/question/multi',
                    table: 'question',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id'), operate : false},
                        {field: 'title', title: __('Title'), operate: 'LIKE %...%', placeholder: '模糊搜索'},
                        {field: 'reply_count', title: __('Reply_count'), operate : false, formatter: Controller.api.formatter.reply_count},
                        {field: 'author', title: __('Author'), operate : false},
                        {field: 'create_time', title: __('Create_time'), operate : false, formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), operate : false, formatter: Table.api.formatter.status},
                        {field: 'weigh', title: __('Weigh'), operate : false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ],
                search : false
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
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
	        formatter: {
	        	reply_count : function (value, row, index) {
	                //这里手动构造URL
	                url = "faq/question/replyList?id=" + row.id;
	                return '<a href="' + url + '" class="btn btn-info btn-xs btn-detail btn-dialog" title="回答详情">' + value + '</a>';
	            }
	        }
        }
    };
    return Controller;
});