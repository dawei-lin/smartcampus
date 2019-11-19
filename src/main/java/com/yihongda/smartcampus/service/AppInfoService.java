package com.yihongda.smartcampus.service;

import com.yihongda.smartcampus.entity.AppInfo;
import com.yihongda.smartcampus.entity.AppInfoParam;

import java.util.List;

public interface AppInfoService {
    int saveAppInfo(AppInfo appInfo);

    int updateAppInfo(AppInfo appInfo);

    int updateAppInfoStatus(AppInfo appInfo);

    int deleteAppInfo(String id);

    int getCountByAppName(String appname);

    int getCountByIdAndAppName(String id, String appname);

    List<AppInfo> getAppInfoListByParam(AppInfoParam appInfoParam);

    List<AppInfo> getAppInfoListByAppType(String apptype);

    List<AppInfo> getInformationCenter();

    List<AppInfo> getUseApp(String uid);

    List<AppInfo> getCommonUseApp(String uid);

    int changeUseAppType(String uid, String aid, Integer type);

    int getAppCount(AppInfoParam appInfoParam);

    AppInfo getAppInfoById(String id);

    int saveUseApp(String uid, String aid, String token);
}
