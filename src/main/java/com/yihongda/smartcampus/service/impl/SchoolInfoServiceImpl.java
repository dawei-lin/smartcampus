package com.yihongda.smartcampus.service.impl;

import com.yihongda.smartcampus.dao.SchoolInfoDao;
import com.yihongda.smartcampus.entity.SchoolInfo;
import com.yihongda.smartcampus.service.SchoolInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SchoolInfoServiceImpl implements SchoolInfoService {
    @Autowired
    private SchoolInfoDao schoolInfoDao;

    @Override
    public int getCountBySchoolName(String schoolname) {
        return schoolInfoDao.getCountBySchoolName(schoolname);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int saveSchoolInfo(SchoolInfo schoolInfo) {
        return schoolInfoDao.saveSchoolInfo(schoolInfo);
    }

    @Override
    public int getCountBySchoolNameAndId(String id, String schoolname) {
        return schoolInfoDao.getCountBySchoolNameAndId(id, schoolname);
    }

    @Override
    public List<SchoolInfo> getSchoolList() {
        return schoolInfoDao.getSchoolList();
    }

    @Override
    public int getCountBySchoolId(String schoolid) {
        return schoolInfoDao.getCountBySchoolId(schoolid);
    }

    @Override
    public int updateSchoolInfo(SchoolInfo schoolInfo) {
        return schoolInfoDao.updateSchoolInfo(schoolInfo);
    }

    @Override
    public SchoolInfo getSchoolInfoById(String id) {
        return schoolInfoDao.getSchoolInfoById(id);
    }
}
