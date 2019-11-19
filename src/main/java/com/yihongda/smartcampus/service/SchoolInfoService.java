package com.yihongda.smartcampus.service;

import com.yihongda.smartcampus.entity.SchoolInfo;

import java.util.List;

public interface SchoolInfoService {
    int getCountBySchoolName(String schoolname);

    int saveSchoolInfo(SchoolInfo schoolInfo);

    int getCountBySchoolNameAndId(String id, String schoolname);

    List<SchoolInfo> getSchoolList();

    int getCountBySchoolId(String schoolid);

    int updateSchoolInfo(SchoolInfo schoolInfo);

    SchoolInfo getSchoolInfoById(String id);
}
