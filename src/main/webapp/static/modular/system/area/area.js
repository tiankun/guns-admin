/**
 * 行政区划管理初始化
 */
var Area = {
    id: "AreaTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Area.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: '主键id', field: 'id', visible: true, align: 'center', valign: 'middle',width:'50px'},
        {title: '简称', field: 'simplename', visible: true, align: 'center', valign: 'middle'},
        {title: '全称', field: 'fullname', visible: true, align: 'center', valign: 'middle'},
        {title: '区域编码', field: 'areaCode', visible: true, align: 'center', valign: 'middle'},
        {title: '排序', field: 'num', visible: true, align: 'center', valign: 'middle'}
        /*{title: '父部门id', field: 'pid', visible: true, align: 'center', valign: 'middle'},
        {title: '父级ids', field: 'pids', visible: true, align: 'center', valign: 'middle'}*/
    ];
};

/**
 * 检查是否选中
 */
Area.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Area.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加行政区划
 */
Area.openAddArea = function () {
    var index = layer.open({
        type: 2,
        title: '添加行政区划',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/area/area_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看行政区划详情
 */
Area.openAreaDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '行政区划详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/area/area_update/' + Area.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除行政区划
 */
Area.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/area/delete", function (data) {
            Feng.success("删除成功!");
            Area.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("areaId", this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询行政区划列表
 */
Area.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Area.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Area.initColumn();
    var table = new BSTreeTable(Area.id, "/area/list", defaultColunms);
    //table.setPaginationType("client");
    table.setExpandColumn(2);
    table.setIdField("id");
    table.setCodeField("id");
    table.setParentCodeField("pid");
    table.setExpandAll(false);
    Area.table = table.init();
});
