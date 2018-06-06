package com.stylefeng.guns.modular.houseManage.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.util.ToolUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.common.persistence.model.THouse;
import com.stylefeng.guns.modular.houseManage.service.ITHouseService;

import java.util.UUID;

/**
 * 房屋管理控制器
 *
 * @author fengshuonan
 * @Date 2018-01-16 11:33:27
 */
@Controller
@RequestMapping("/tHouse")
public class THouseController extends BaseController {

    private String PREFIX = "/houseManage/tHouse/";

    @Autowired
    private ITHouseService tHouseService;

    /**
     * 跳转到房屋管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "tHouse.html";
    }

    /**
     * 跳转到添加房屋管理
     */
    @RequestMapping("/tHouse_add")
    public String tHouseAdd() {
        return PREFIX + "tHouse_add.html";
    }

    /**
     * 跳转到修改房屋管理
     */
    @RequestMapping("/tHouse_update/{tHouseId}")
    public String tHouseUpdate(@PathVariable Integer tHouseId, Model model) {
        THouse tHouse = tHouseService.selectById(tHouseId);
        model.addAttribute("item",tHouse);
        LogObjectHolder.me().set(tHouse);
        return PREFIX + "tHouse_edit.html";
    }

    /**
     * 获取房屋管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        //判断condition是否有值
        if(ToolUtil.isEmpty(condition)){
            return tHouseService.selectList(null);
        }else{
            EntityWrapper<THouse> entityWrapper=new EntityWrapper<>();
            Wrapper wrapper= entityWrapper.like("house_user",condition);
            return tHouseService.selectList(wrapper);
        }
        //如果有值则认为是按业业主名称模糊查询

    }

    /**
     * 新增房屋管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(THouse tHouse) {
        //tHouse.setId(UUID.randomUUID().toString());
        tHouseService.insert(tHouse);
        return super.SUCCESS_TIP;
    }

    /**
     * 删除房屋管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam String tHouseId) {
        tHouseService.deleteById(tHouseId);
        return SUCCESS_TIP;
    }

    /**
     * 修改房屋管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(THouse tHouse) {
        tHouseService.updateById(tHouse);
        return super.SUCCESS_TIP;
    }

    /**
     * 房屋管理详情
     */
    @RequestMapping(value = "/detail/{tHouseId}")
    @ResponseBody
    public Object detail(@PathVariable("tHouseId") Integer tHouseId) {
        return tHouseService.selectById(tHouseId);
    }
}
