package com.yihongda.smartcampus.controller;

import com.github.pagehelper.PageHelper;
import com.yihongda.smartcampus.entity.Permission;
import com.yihongda.smartcampus.entity.RoleInfo;
import com.yihongda.smartcampus.entity.RoleParam;
import com.yihongda.smartcampus.entity.RolePermissionDTO;
import com.yihongda.smartcampus.enums.ReturnCodeType;
import com.yihongda.smartcampus.message.CommonResult;
import com.yihongda.smartcampus.service.RoleInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/roleInfo")
@Api("角色")
public class RoleInfoController {
    @Autowired
    private RoleInfoService roleInfoService;

    @PostMapping("")
    @ApiOperation("保存角色")
    public CommonResult saveRoleInfo(@Valid RoleInfo roleInfo, HttpServletRequest request) {
        if (roleInfoService.getCountByRoleName(roleInfo.getRolename()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        roleInfo.setStatus(1);
        if (StringUtils.isNotEmpty(roleInfo.getPidstr())) {
            List<String> pids = null;
            String[] strs = roleInfo.getPidstr().split(",");
            Arrays.asList(strs);
            roleInfo.setPids(pids);
        }
        roleInfo.setSchoolid((String) request.getAttribute("schoolId"));
        if (roleInfoService.saveRoleInfo(roleInfo) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @PostMapping("/updateRole")
    @ApiOperation("更新角色")
    public CommonResult updateRoleInfo(@Valid RoleInfo roleInfo, HttpServletRequest request) {
        if (roleInfoService.getCountByRoleNameAndId(roleInfo.getRolename(), roleInfo.getId()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        if (StringUtils.isNotEmpty(roleInfo.getPidstr())) {
            List<String> pids = null;
            String[] strs = roleInfo.getPidstr().split(",");
            pids = Arrays.asList(strs);
            roleInfo.setPids(pids);
        }
        roleInfo.setSchoolid((String) request.getAttribute("schoolId"));
        if (roleInfoService.updateRoleInfo(roleInfo) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @GetMapping("getRole/{roleid}")
    @ApiOperation("根据角色id获取角色")
    public RoleInfo getRoleById(@PathVariable String roleid, HttpServletRequest request) {
        return roleInfoService.getRoleById(roleid, (String) request.getAttribute("schoolId"));
    }

    @GetMapping("/roleInfoListByParam")
    @ApiOperation("根据参数获取角色集合")
    public List<RoleInfo> getRoleInfoListByParam(RoleParam roleParam, HttpServletRequest request) {
        if (roleParam != null && roleParam.getPagenum() != null && roleParam.getPagesize() != null) {
            PageHelper.startPage(roleParam.getPagenum(), roleParam.getPagesize());
        }
        roleParam.setSchoolid((String) request.getAttribute("schoolId"));
        return roleInfoService.getRoleListByParam(roleParam);
    }

    @GetMapping("/pageCount")
    @ApiOperation("获取总页数")
    public Integer getPageCount(RoleParam roleParam, HttpServletRequest request) {
        roleParam.setSchoolid((String) request.getAttribute("schoolId"));
        int roleCount = roleInfoService.getRoleCount(roleParam);
        if (roleParam.getPagesize() == null) {
            roleParam.setPagesize(10);
        }
        int pageNum = 0;
        if (roleCount > 0) {
            if (roleCount % roleParam.getPagesize() == 0) {
                pageNum = roleCount / roleParam.getPagesize();
            } else {
                pageNum = roleCount / roleParam.getPagesize() + 1;
            }
        }
        return pageNum;
    }

    @PostMapping("deleteRole/{roleid}")
    @ApiOperation("根据id删除角色")
    public CommonResult deleteRoleInfo(@PathVariable String roleid) {
        if (roleInfoService.deleteRoleInfo(roleid) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @PostMapping("/status")
    @ApiOperation("更新角色状态")
    public CommonResult changeRoleStatus(RoleInfo roleInfo) {
        if (roleInfoService.changeRoleStatus(roleInfo) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @PostMapping("/updatePermission")
    @ApiOperation("更新角色权限")
    public CommonResult updatePermission(@Valid RolePermissionDTO rolePermissionDTO) {
        if (roleInfoService.savePermission(rolePermissionDTO) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @GetMapping("/permission/{rid}")
    @ApiOperation("获取角色对应的权限")
    public List<Permission> getPermissionTree(@PathVariable String rid, HttpServletRequest request) {
        return roleInfoService.getPermissionTree(rid, (String) request.getAttribute("schoolId"));
    }
}
