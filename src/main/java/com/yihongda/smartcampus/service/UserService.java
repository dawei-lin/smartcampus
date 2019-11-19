package com.yihongda.smartcampus.service;

import com.yihongda.smartcampus.entity.*;

import java.util.List;

public interface UserService {
    int saveUser(User user);

    int getCountByUserName(String userName);

    String getIdByUserName(String userName);

    int getCountByIdAndUserName(String id, String userName);

    int updateUser(User user);

    int deleteUser(String id);

    int saveUserList(List<User> userList);

    int updatePersonalInfo(User user);

    List<String> getUserNameList();

    List<User> getUserListByParam(UserParam userParam);

    List<User> getUnauditedUserListByParam(UserParam userParam);

    int savePermission(UserPermissionDTO userPermissionDTO);

    List<Permission> getPermissionTree(String uid, String schoolid);

    int getUserCount(UserParam userParam);

    User getUserById(String id, String schoolid);

    int authorize(String uid);

    int changeRoleStatus(UserInfo userInfo);
}
