package com.yihongda.smartcampus.controller;

import com.yihongda.smartcampus.entity.AppType;
import com.yihongda.smartcampus.enums.ReturnCodeType;
import com.yihongda.smartcampus.message.CommonResult;
import com.yihongda.smartcampus.service.AppTypeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/appType")
@Api("应用类型")
public class AppTypeController {
    @Autowired
    private AppTypeService appTypeService;

    @PostMapping("/saveAppType")
    @ApiOperation("添加应用分类")
    public CommonResult saveAppType(@Valid AppType appType, HttpServletRequest request) {
        if (appTypeService.getCountByName(appType.getTname()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        appType.setSchoolid((String) request.getAttribute("schoolId"));
        if (appTypeService.saveAppType(appType) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @PostMapping("/updateAppType")
    @ApiOperation("更新应用分类")
    public CommonResult updateAppType(@Valid AppType appType, HttpServletRequest request) {
        if (appTypeService.getCountByIdAndName(appType.getId(), appType.getTname()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        appType.setSchoolid((String) request.getAttribute("schoolId"));
        if (appTypeService.updateAppType(appType) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @PostMapping("/deleteAppType/{id}")
    @ApiOperation("根据id删除类型")
    public CommonResult deleteApType(@PathVariable String id) {
        if (appTypeService.deleteAppType(id) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @GetMapping("/getAppType/{id}")
    @ApiOperation("根据id获取应用类型")
    public AppType getApTypeById(@PathVariable String id, HttpServletRequest request) {
        return appTypeService.getAppTypeById(id, (String) request.getAttribute("schoolId"));
    }

    @GetMapping("/appTypeListByName")
    @ApiOperation("根据名字查询分类")
    public List<AppType> getAppTypeListByName(String tname, HttpServletRequest request) {
        return appTypeService.getAppTypeListByName(tname, (String) request.getAttribute("schoolId"));
    }

    @GetMapping("/appTypeList")
    @ApiOperation("查询全部应用分类")
    public List<AppType> getAppTypeList(HttpServletRequest request) {
        return appTypeService.getAppTypeList((String) request.getAttribute("schoolId"));
    }
}
