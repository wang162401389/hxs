define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'article/article/index',
                    add_url: 'article/article/add',
                    edit_url: 'article/article/edit',
                    del_url: 'article/article/del',
                    multi_url: 'article/article/multi',
                    table: 'article',
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
                        {field: 'id', title: __('Id'), operate: false},
                        {field: 'type', title: '栏目类型', operate: false},
                        {field: 'category.name', title: '分类', formatter: Table.api.formatter.search},
                        {field: 'title', title: __('Title'), operate: 'LIKE %...%', placeholder: '模糊搜索'},
                        {field: 'author', title: '发布人', operate: false},
                        {field: 'src', title: '文章来源', operate: false},
                        {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime, operate: false},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, operate: false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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
            	$(document).on("change", "#c-type", function () {
                    $("#c-category_id option[data-type='all']").prop("selected", true);
                    $("#c-category_id option").removeClass("hide");
                    $("#c-category_id option[data-type!='" + $(this).val() + "'][data-type!='all']").addClass("hide");
                    $("#c-category_id").selectpicker("refresh");
                });
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});