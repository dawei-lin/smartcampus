package com.yihongda.smartcampus.service;

import com.yihongda.smartcampus.entity.Permission;

import java.util.List;

public interface PermissionService {
    List<Permission> getPermissionTree(String schoolid);
}
