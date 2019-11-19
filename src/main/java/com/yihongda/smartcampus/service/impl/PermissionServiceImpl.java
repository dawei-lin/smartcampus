package com.yihongda.smartcampus.service.impl;

import com.yihongda.smartcampus.dao.PermissionDao;
import com.yihongda.smartcampus.entity.Permission;
import com.yihongda.smartcampus.service.PermissionService;
import com.yihongda.smartcampus.util.PermissionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionServiceImpl implements PermissionService {
    @Autowired
    private PermissionDao permissionDao;

    @Override
    public List<Permission> getPermissionTree(String schoolid) {
        List<Permission> permissionList = permissionDao.getPermissionList(schoolid);
        return PermissionUtil.buildPermissionTree(permissionList);
    }


}
