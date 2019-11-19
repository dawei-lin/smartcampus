package com.yihongda.smartcampus.service;

import com.yihongda.smartcampus.entity.LoginSuccessInfo;
import com.yihongda.smartcampus.entity.Permission;
import com.yihongda.smartcampus.entity.UserInfo;

import java.util.List;

public interface UserInfoService {
    int getCountByUserName(String userName);

    int saveUserInfo(UserInfo userInfo);

    LoginSuccessInfo getLoginInfoByUserNameAndPassword(String userName, String password);

    List<Permission> getPermissionTree(String uid, String schoolid);
}
