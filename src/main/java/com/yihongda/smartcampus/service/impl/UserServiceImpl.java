package com.yihongda.smartcampus.service.impl;

import com.yihongda.smartcampus.dao.PermissionDao;
import com.yihongda.smartcampus.dao.UserDao;
import com.yihongda.smartcampus.dao.UserPermissionDao;
import com.yihongda.smartcampus.entity.*;
import com.yihongda.smartcampus.service.UserService;
import com.yihongda.smartcampus.util.PermissionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserPermissionDao userPermissionDao;
    @Autowired
    private PermissionDao permissionDao;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int saveUser(User user) {
        return userDao.saveUser(user);
    }

    @Override
    public int getCountByUserName(String userName) {
        return userDao.getCountByUserName(userName);
    }

    @Override
    public String getIdByUserName(String userName) {
        return userDao.getIdByUserName(userName);
    }

    @Override
    public int getCountByIdAndUserName(String id, String userName) {
        return userDao.getCountByIdAndUserName(id, userName);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updateUser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteUser(String id) {
        return userDao.deleteUser(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int saveUserList(List<User> userList) {
        return userDao.saveUserList(userList);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updatePersonalInfo(User user) {
        return userDao.updatePersonalInfo(user);
    }

    @Override
    public List<String> getUserNameList() {
        return userDao.getUserNameList();
    }

    @Override
    public List<User> getUserListByParam(UserParam userParam) {
        return userDao.getUserListByParam(userParam);
    }

    @Override
    public List<User> getUnauditedUserListByParam(UserParam userParam) {
        return userDao.getUnauditedUserListByParam(userParam);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int savePermission(UserPermissionDTO userPermissionDTO) {
        List<UserPermission> userPermissionList = new ArrayList<>();
        if (userPermissionDTO.getPids() != null) {
            for (String pid : userPermissionDTO.getPids()) {
                UserPermission userPermission = new UserPermission();
                userPermission.setUid(userPermissionDTO.getUid());
                userPermission.setPid(pid);
                userPermissionList.add(userPermission);
            }
        }
        userPermissionDao.deleteByUserId(userPermissionDTO.getUid());
        if (userPermissionList.size() > 0) {
            return userPermissionDao.savePermissionList(userPermissionList);
        }
        return 0;
    }

    @Override
    public List<Permission> getPermissionTree(String uid, String schoolid) {
        List<UserPermission> userPermissionList = userPermissionDao.getUserPermissionById(uid);
        Set<String> flagSet = new HashSet<>();
        if (userPermissionList != null) {
            for (UserPermission userPermission : userPermissionList) {
                flagSet.add(userPermission.getPid());
            }
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
    public int getUserCount(UserParam userParam) {
        return userDao.getUserCount(userParam);
    }

    @Override
    public User getUserById(String id, String schoolid) {
        return userDao.getUserById(id, schoolid);
    }

    @Override
    public int authorize(String uid) {
        return userDao.authorize(uid);
    }

    @Override
    public int changeRoleStatus(UserInfo userInfo) {
        return userDao.changeRoleStatus(userInfo);
    }

}
