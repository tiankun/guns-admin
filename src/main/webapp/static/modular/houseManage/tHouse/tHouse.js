/**
 * 房屋管理管理初始化
 */
var THouse = {
    id: "THouseTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
THouse.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: '房屋编号', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '户主名称', field: 'houseUser', visible: true, align: 'center', valign: 'middle'},
        {title: '房屋地址', field: 'houseAddress', visible: true, align: 'center', valign: 'middle'},
        {title: '房屋交付时间', field: 'houseDate', visible: true, align: 'center', valign: 'middle'},
        {title: '房屋描述', field: 'houseDesc', visible: true, align: 'center', valign: 'middle'},
        {
            title: '性别',
            field: 'sex',
            visible: true,
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                if (row['sex'] === '0') {
                    return '男';
                }
                if (row['sex'] === '1') {
                    return '女';
                }
                return value;
            }
        }
    ];
};

/**
 * 检查是否选中
 */
THouse.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        THouse.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加房屋管理
 */
THouse.openAddTHouse = function () {
    var index = layer.open({
        type: 2,
        title: '添加房屋管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/tHouse/tHouse_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看房屋管理详情
 */
THouse.openTHouseDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '房屋管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/tHouse/tHouse_update/' + THouse.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除房屋管理
 */
THouse.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/tHouse/delete", function (data) {
            Feng.success("删除成功!");
            THouse.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("tHouseId", this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询房屋管理列表
 */
THouse.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    THouse.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = THouse.initColumn();
    var table = new BSTable(THouse.id, "/tHouse/list", defaultColunms);
    table.setPaginationType("client");
    THouse.table = table.init();
});
