package com.yihongda.smartcampus.service.impl;

import com.yihongda.smartcampus.dao.PermissionDao;
import com.yihongda.smartcampus.dao.RoleInfoDao;
import com.yihongda.smartcampus.dao.RolePermissionDao;
import com.yihongda.smartcampus.entity.*;
import com.yihongda.smartcampus.service.RoleInfoService;
import com.yihongda.smartcampus.util.PermissionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleInfoServiceImpl implements RoleInfoService {
    @Autowired
    private RoleInfoDao roleInfoDao;
    @Autowired
    private RolePermissionDao rolePermissionDao;
    @Autowired
    private PermissionDao permissionDao;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int saveRoleInfo(RoleInfo roleInfo) {
        int num = roleInfoDao.saveRoleInfo(roleInfo);
        if (num > 0) {
            List<RolePermission> rolePermissionList = new ArrayList<>();
            String rid = roleInfoDao.getRoleIdByName(roleInfo.getRolename());
            if (roleInfo.getPids() != null && roleInfo.getPids().size() > 0) {
                for (String pid : roleInfo.getPids()) {
                    RolePermission rolePermission = new RolePermission();
                    rolePermission.setRid(rid);
                    rolePermission.setPid(pid);
                    rolePermissionList.add(rolePermission);
                }
                rolePermissionDao.saveRolePermissionList(rolePermissionList);
            }
        }
        return num;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updateRoleInfo(RoleInfo roleInfo) {
        int num = roleInfoDao.updateRoleInfo(roleInfo);
        if (num > 0) {
            List<RolePermission> rolePermissionList = new ArrayList<>();
            String rid = roleInfoDao.getRoleIdByName(roleInfo.getRolename());
            if (roleInfo.getPids() != null) {
                for (String pid : roleInfo.getPids()) {
                    RolePermission rolePermission = new RolePermission();
                    rolePermission.setRid(rid);
                    rolePermission.setPid(pid);
                    rolePermissionList.add(rolePermission);
                }
            }
            rolePermissionDao.deleteByRoleId(roleInfo.getId());
            if (rolePermissionList.size() > 0) {
                rolePermissionDao.saveRolePermissionList(rolePermissionList);
            }
        }
        return num;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteRoleInfo(String id) {
        int num = roleInfoDao.deleteRoleInfo(id);
        if (num > 0) {
            rolePermissionDao.deleteByRoleId(id);
        }
        return num;
    }

    @Override
    public List<RoleInfo> getRoleListByParam(RoleParam roleParam) {
        return roleInfoDao.getRoleListByParam(roleParam);
    }

    @Override
    public RoleInfo getRoleById(String id, String schoolid) {
        RoleInfo roleInfo = roleInfoDao.getRoleById(id, schoolid);
        if (roleInfo != null) {
            List<RolePermission> rolePermissionList = rolePermissionDao.getRolePermissionById(id);
            Set<String> flagSet = new HashSet<>();
            for (RolePermission rolePermission : rolePermissionList) {
                flagSet.add(rolePermission.getPid());
            }
            List<Permission> permissionList = permissionDao.getPermissionList(schoolid);
            for (Permission permission : permissionList) {
                if (flagSet.contains(permission.getId())) {
                    permission.setTick(true);
                } else {
                    permission.setTick(false);
                }
            }
            roleInfo.setPermissionList(PermissionUtil.buildPermissionTree(permissionList));
        }
        return roleInfo;
    }

    @Override
    public int getCountByRoleName(String rolename) {
        return roleInfoDao.getCountByRoleName(rolename);
    }

    @Override
    public int getCountByRoleNameAndId(String rolename, String id) {
        return roleInfoDao.getCountByRoleNameAndId(rolename, id);
    }

    @Override
    public int changeRoleStatus(RoleInfo roleInfo) {
        return roleInfoDao.changeRoleStatus(roleInfo);
    }

    @Override
    public int getRoleCount(RoleParam roleParam) {
        return roleInfoDao.getRoleCount(roleParam);
    }

    @Override
    public List<Permission> getPermissionTree(String rid, String schoolid) {
        List<RolePermission> rolePermissionList = rolePermissionDao.getRolePermissionById(rid);
        Set<String> flagSet = new HashSet<>();
        for (RolePermission rolePermission : rolePermissionList) {
            flagSet.add(rolePermission.getPid());
        }
        List<Permission> permissionList = permissionDao.getPermissionList(schoolid);
        for (Permission permission : permissionList) {
            if (flagSet.contains(permission.getId())) {
                permission.setTick(true);
            } else {
                permission.setTick(false);
            }
        }
        return permissionList;
    }

    @Override
    @Transactional
    public int savePermission(RolePermissionDTO rolePermissionDTO) {
        List<RolePermission> rolePermissionList = new ArrayList<>();
        if (rolePermissionDTO.getPids() != null) {
            for (String pid : rolePermissionDTO.getPids()) {
                RolePermission rolePermission = new RolePermission();
                rolePermission.setRid(rolePermissionDTO.getRid());
                rolePermission.setPid(pid);
                rolePermissionList.add(rolePermission);
            }
        }
        rolePermissionDao.deleteByRoleId(rolePermissionDTO.getRid());
        if (rolePermissionList.size() > 0) {
            return rolePermissionDao.saveRolePermissionList(rolePermissionList);
        }
        return 0;
    }
}
