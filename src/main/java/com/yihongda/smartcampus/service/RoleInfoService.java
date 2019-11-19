package com.yihongda.smartcampus.service;

import com.yihongda.smartcampus.entity.Permission;
import com.yihongda.smartcampus.entity.RoleInfo;
import com.yihongda.smartcampus.entity.RoleParam;
import com.yihongda.smartcampus.entity.RolePermissionDTO;

import java.util.List;

public interface RoleInfoService {
    int saveRoleInfo(RoleInfo roleInfo);

    int updateRoleInfo(RoleInfo roleInfo);

    int deleteRoleInfo(String id);

    List<RoleInfo> getRoleListByParam(RoleParam roleParam);

    RoleInfo getRoleById(String id, String schoolid);

    int getCountByRoleName(String rolename);

    int getCountByRoleNameAndId(String rolename, String id);

    int changeRoleStatus(RoleInfo roleInfo);

    int getRoleCount(RoleParam roleParam);

    List<Permission> getPermissionTree(String rid, String schoolid);

    int savePermission(RolePermissionDTO rolePermissionDTO);
}
