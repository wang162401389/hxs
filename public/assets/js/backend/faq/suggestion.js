define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'faq/suggestion/index',
                    add_url: 'faq/suggestion/add',
                    edit_url: '',
                    del_url: '',
                    multi_url: 'faq/suggestion/multi',
                    table: 'suggestion',
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
                        {field: 'id', title: __('Id'), operate: false},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE %...%', placeholder: '模糊搜索'},
                        {field: 'mb_content', title: __('Content'), operate: false},
                        {field: 'create_time', title: __('Create_time'), formatter: Table.api.formatter.datetime, operate: false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,
                            buttons: [{
                                name: 'detail',
                                text: __('Detail'),
                                icon: 'fa fa-list',
                                classname: 'btn btn-info btn-xs btn-detail btn-dialog',
                                url: 'faq/suggestion/detail'
                            }]
                        }
                    ]
                ],
                //禁用默认搜索
                search: false
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
            }
        }
    };
    return Controller;
});