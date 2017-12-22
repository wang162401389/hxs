define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'apply/index',
                    add_url: 'apply/add',
                    edit_url: 'apply/edit',
                    del_url: '',
                    multi_url: 'apply/multi',
                    table: 'apply',
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
                        {field: 'username', title: __('Username')},
                        {field: 'cellphone', title: __('Cellphone')},
                        {field: 'gender', title: __('Gender'), operate: false},
                        {field: 'area_id', title: '地区', operate: false},
                        {field: 'borrow_money', title: __('Borrow_money'), operate: false},
                        {field: 'create_time', title: __('Create_time'), operate: false, formatter: Table.api.formatter.datetime},
                        {field: 'age', title: __('Age'), operate: false},
                        {field: 'has_house', title: __('Has_house'), searchList: {'1': '有', '0': '无'}},
                        {field: 'has_car', title: __('Has_car'), searchList: {'1': '有', '0': '无'}},
                        {field: 'profession', title: __('Profession'), operate: false},
                        {field: 'follow_up', title: '跟进人', searchList: $.getJSON('apply/namelist')},
                        {field: 'distribution_status', title: '分配状态', searchList: {'0': '未分配', '1': '已分配'}, formatter: Controller.api.formatter.distribution_status},
                        {field: 'distribution_time', title: '分配时间', operate: false, formatter: Table.api.formatter.datetime},
                        {field: 'status', title: '成交状态', searchList: {'0': '潜在客户', '1': '不成交客户', '2' : '已成交客户'}},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                        	buttons:[],
                        	formatter:function (value, row, index) {
//                        		var that = $.extend({}, this);
//                            	var table = $(that.table).clone(true);
                        		this.buttons.splice(0, this.buttons.length);
                        		if(row.click_detail_flag == 1){
//                        			if(Config.isSuperAdmin == true){
//                        				$(table).data("operate-edit", null);
//                        			}
                        			this.buttons.push({
                        				name: 'detail',
                        				text: __('Detail'),
                        				icon: 'fa fa-list',
                        				classname: 'btn btn-info btn-xs btn-detail btn-dialog',
                        				url: 'apply/detail'
                        			});
                        		}
//                        		that.table = table;
                        		return Table.api.formatter.operate.call(this, value, row, index);
                        	}
                        }
                    ]
                ],
                rowStyle: function (row, index) {
                    if(Config.isSuperAdmin != true && row.remark_by_super == 1){                
                        return {
                            classes: 'trRed',
                            css:{'color':'#ff0000'}
                        };
                    }else{
                        return {};
                    }
                },
                
                //禁用默认搜索
                search: false,
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            //取消双击事件
            table.off('dbl-click-row.bs.table');

            //分配
            $(document).on("click", ".btn-selected", function () {
                Backend.api.open('apply/distribute/ids/' + Table.api.selectedids(table), $(this).text());
            });
            
            //取消页面选中功能
            document.onselectstart = function(){
			    event.returnValue = false;
			}
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        distribute : function () {
        	Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                
                $(document).on("change", "select[name='gid']", function () {
                	$.ajax({
                        url: "apply/getAdminIds",
                        type: 'post',
                        dataType: 'json',
                        data: {gid: $(this).val()},
                        success: function (ret) {
                            var data = ret.data || {};
                            var html = "";
                            for(var key in data){
                                html += "<option value=" + key + ">"+ data[key] +"</option>"
                            }
                        	$('select[name=aid]').html(html);
                        	
                        }, error: function (e) {
                            Backend.api.toastr.error(e.message);
                        }
                    });
                });
            },
            formatter : {
            	distribution_status : function (value, row, index) {
            		var typeArr = {'0': '未分配', '1': '已分配'};
					return typeArr[value.toString()];
            	}
            }
        }
    };
    return Controller;
});