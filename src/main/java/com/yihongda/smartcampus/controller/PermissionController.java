package com.yihongda.smartcampus.controller;

import com.yihongda.smartcampus.entity.Permission;
import com.yihongda.smartcampus.service.PermissionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/permission")
@Api("权限")
public class PermissionController {
    @Autowired
    private PermissionService permissionService;

    @GetMapping("/permissionTree")
    @ApiOperation("获取权限树")
    public List<Permission> getPermissionTree(HttpServletRequest request) {
        return permissionService.getPermissionTree((String) request.getAttribute("schoolId"));
    }
}
