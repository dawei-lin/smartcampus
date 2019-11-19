package com.yihongda.smartcampus.service.impl;

import com.yihongda.smartcampus.dao.AppTypeDao;
import com.yihongda.smartcampus.entity.AppType;
import com.yihongda.smartcampus.service.AppTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AppTypeServiceImpl implements AppTypeService {
    @Autowired
    private AppTypeDao appTypeDao;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int saveAppType(AppType appType) {
        return appTypeDao.saveAppType(appType);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updateAppType(AppType appType) {
        return appTypeDao.updateAppType(appType);
    }

    @Override
    public List<AppType> getAppTypeListByName(String tname, String schoolid) {
        return appTypeDao.getAppTypeListByName(tname, schoolid);
    }

    @Override
    public int getCountByName(String tname) {
        return appTypeDao.getCountByName(tname);
    }

    @Override
    public int getCountByIdAndName(String id, String tname) {
        return appTypeDao.getCountByIdAndName(id, tname);
    }

    @Override
    public List<AppType> getAppTypeList(String schoolid) {
        return appTypeDao.getAppTypeList(schoolid);
    }

    @Override
    public int deleteAppType(String id) {
        return appTypeDao.deleteAppType(id);
    }

    @Override
    public AppType getAppTypeById(String id, String schoolid) {
        return appTypeDao.getAppTypeById(id, schoolid);
    }
}
