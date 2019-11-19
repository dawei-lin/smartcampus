package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.SchoolInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface SchoolInfoDao {
    @Select("select count(id) from schoolinfo where schoolname=#{schoolname}")
    int getCountBySchoolName(String schoolname);

    @Insert("insert into schoolinfo(id,schoolname,contact,tel,logo,bgimg,address,schooltype) values(uuid(),#{schoolname},#{contact},#{tel},#{logo},#{bgimg},#{address},#{schooltype})")
    int saveSchoolInfo(SchoolInfo schoolInfo);

    @Select("select count(1) from schoolinfo where id!=#{id} and schoolname=#{schoolname}")
    int getCountBySchoolNameAndId(String id, String schoolname);

    @Select("select id,schoolname from schoolinfo")
    List<SchoolInfo> getSchoolList();

    @Select("select count(1) from schoolinfo where id=#{schoolid}")
    int getCountBySchoolId(String schoolid);

    @Update("update schoolinfo set schoolname=#{schoolname},contact=#{contact},tel=#{tel},address=#{address},schooltype=#{schooltype},logo=#{logo},bgimg=#{bgimg} where id=#{id}")
    int updateSchoolInfo(SchoolInfo schoolInfo);

    @Select("select id,schoolname,contact,tel,logo,bgimg,address,schooltype from schoolinfo where id=#{id}")
    SchoolInfo getSchoolInfoById(String id);
}
