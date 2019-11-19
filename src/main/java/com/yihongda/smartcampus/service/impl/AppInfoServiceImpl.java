package com.yihongda.smartcampus.service.impl;

import com.yihongda.smartcampus.dao.AppInfoDao;
import com.yihongda.smartcampus.entity.AppInfo;
import com.yihongda.smartcampus.entity.AppInfoParam;
import com.yihongda.smartcampus.service.AppInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AppInfoServiceImpl implements AppInfoService {
    @Autowired
    private AppInfoDao appInfoDao;

    @Override
    @Transactional
    public int saveAppInfo(AppInfo appInfo) {
        return appInfoDao.saveAppInfo(appInfo);
    }

    @Override
    @Transactional
    public int updateAppInfo(AppInfo appInfo) {
        return appInfoDao.updateAppInfo(appInfo);
    }

    @Override
    @Transactional
    public int updateAppInfoStatus(AppInfo appInfo) {
        return appInfoDao.updateAppInfoStatus(appInfo);
    }

    @Override
    @Transactional
    public int deleteAppInfo(String id) {
        return appInfoDao.deleteAppInfo(id);
    }

    @Override
    public int getCountByAppName(String appname) {
        return appInfoDao.getCountByAppName(appname);
    }

    @Override
    public int getCountByIdAndAppName(String id, String appname) {
        return appInfoDao.getCountByIdAndAppName(id, appname);
    }

    @Override
    public List<AppInfo> getAppInfoListByParam(AppInfoParam appInfoParam) {
        return appInfoDao.getAppInfoListByParam(appInfoParam);
    }

    @Override
    public List<AppInfo> getAppInfoListByAppType(String apptype) {
        return appInfoDao.getAppInfoListByAppType(apptype);
    }

    @Override
    public List<AppInfo> getInformationCenter() {
        return appInfoDao.getInformationCenter();
    }

    @Override
    public List<AppInfo> getUseApp(String uid) {
        return appInfoDao.getUseApp(uid);
    }

    @Override
    public List<AppInfo> getCommonUseApp(String uid) {
        return appInfoDao.getCommonUseApp(uid);
    }

    @Override
    public int changeUseAppType(String uid, String aid, Integer type) {
        return appInfoDao.changeUseAppType(uid, aid, type);
    }

    @Override
    public int getAppCount(AppInfoParam appInfoParam) {
        return appInfoDao.getAppCount(appInfoParam);
    }

    @Override
    public AppInfo getAppInfoById(String id) {
        return appInfoDao.getAppInfoById(id);
    }

    @Override
    public int saveUseApp(String uid, String aid, String token) {
        return appInfoDao.saveUseApp(uid, aid, token);
    }
}
