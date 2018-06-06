/**
 * 初始化房屋管理详情对话框
 */
var THouseInfoDlg = {
    tHouseInfoData : {}
};

/**
 * 清除数据
 */
THouseInfoDlg.clearData = function() {
    this.tHouseInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
THouseInfoDlg.set = function(key, val) {
    this.tHouseInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
THouseInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
THouseInfoDlg.close = function() {
    parent.layer.close(window.parent.THouse.layerIndex);
}

/**
 * 收集数据
 */
THouseInfoDlg.collectData = function() {
    this
    .set('id')
    .set('houseUser')
    .set('houseAddress')
    .set('houseDate')
        .set('sex')
    ;
}

/**
 * 提交添加
 */
THouseInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tHouse/add", function(data){
        Feng.success("添加成功!");
        window.parent.THouse.table.refresh();
        THouseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tHouseInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
THouseInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tHouse/update", function(data){
        Feng.success("修改成功!");
        window.parent.THouse.table.refresh();
        THouseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tHouseInfoData);
    ajax.start();
}

$(function() {

});
