package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.UserPermission;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserPermissionDao {
    int savePermissionList(List<UserPermission> userPermissionList);

    @Delete("delete from userpermission where uid=#{uid}")
    int deleteByUserId(String uid);

    @Select("select uid,pid from userpermission where uid=#{uid}")
    List<UserPermission> getUserPermissionById(String uid);
}
