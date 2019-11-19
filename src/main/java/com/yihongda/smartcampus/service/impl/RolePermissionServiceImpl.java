package com.yihongda.smartcampus.service.impl;

import com.yihongda.smartcampus.dao.RolePermissionDao;
import com.yihongda.smartcampus.entity.RolePermission;
import com.yihongda.smartcampus.service.RolePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RolePermissionServiceImpl implements RolePermissionService {
    @Autowired
    private RolePermissionDao rolePermissionDao;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int saveRolePermissionList(List<RolePermission> rolePermissionList) {
        return rolePermissionDao.saveRolePermissionList(rolePermissionList);
    }
}
