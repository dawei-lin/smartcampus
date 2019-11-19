package com.yihongda.smartcampus.service.impl;

import com.yihongda.smartcampus.dao.*;
import com.yihongda.smartcampus.entity.*;
import com.yihongda.smartcampus.service.UserInfoService;
import com.yihongda.smartcampus.util.PermissionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;


@Service
public class UserInfoServiceImpl implements UserInfoService {
    @Autowired
    private UserInfoDao userInfoDao;
    @Autowired
    private UserPermissionDao userPermissionDao;
    @Autowired
    private RolePermissionDao rolePermissionDao;
    @Autowired
    private PermissionDao permissionDao;
    @Autowired
    private RoleInfoDao roleInfoDao;

    @Override
    public int getCountByUserName(String userName) {
        return userInfoDao.getCountByUserName(userName);
    }

    @Override
    public int saveUserInfo(UserInfo userInfo) {
        return userInfoDao.saveUserInfo(userInfo);
    }

    @Override
    public LoginSuccessInfo getLoginInfoByUserNameAndPassword(String userName, String password) {
        return userInfoDao.getLoginInfoByUserNameAndPassword(userName, password);
    }


    @Override
    public List<Permission> getPermissionTree(String uid, String schoolid) {
        UserInfo userInfo = userInfoDao.getUserInfoById(uid, schoolid);
        if (userInfo != null && userInfo.getStatus() == 1) {
            Set<String> flagSet = new HashSet<>();
            List<UserPermission> userPermissionList = userPermissionDao.getUserPermissionById(uid);
            if (userPermissionList != null) {
                for (UserPermission userPermission : userPermissionList) {
                    flagSet.add(userPermission.getPid());
                }
            }
            RoleInfo roleInfo = roleInfoDao.getRoleById(userInfo.getRoleid(),schoolid);
            if (roleInfo != null && roleInfo.getStatus() == 1) {
                List<RolePermission> rolePermissionList = rolePermissionDao.getRolePermissionById(userInfo.getRoleid());
                if (rolePermissionList != null) {
                    for (RolePermission rolePermission : rolePermissionList) {
                        flagSet.add(rolePermission.getPid());
                    }
                }
            }
            List<Permission> permissionList = permissionDao.getPermissionList(schoolid);
            Iterator<Permission> it = permissionList.iterator();
            while (it.hasNext()) {
                if (!flagSet.contains(it.next().getId())) {
                    it.remove();
                }
            }
            return permissionList;
        } else {
            return null;
        }
    }


}
