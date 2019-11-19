package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.Permission;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PermissionDao {
    @Select("SELECT p.id id,m.menuname menuname,pp.id pid,m.url url " +
            "from menuinfo m LEFT JOIN permission p on p.menuid=m.id LEFT JOIN permission pp on pp.menuid=m.pid " +
            "where p.schoolid=#{schoolid} or p.schoolid is null and m.schoolid=#{schoolid} or m.schoolid is null")
    List<Permission> getPermissionList(String schoolid);
}
