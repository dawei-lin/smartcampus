package com.yihongda.smartcampus.service;

import com.yihongda.smartcampus.entity.AppType;

import java.util.List;

public interface AppTypeService {
    int saveAppType(AppType appType);

    int updateAppType(AppType appType);

    List<AppType> getAppTypeListByName(String tname, String schoolid);

    int getCountByName(String tname);

    int getCountByIdAndName(String id, String tname);

    List<AppType> getAppTypeList(String schoolid);

    int deleteAppType(String id);

    AppType getAppTypeById(String id, String schoolid);
}
