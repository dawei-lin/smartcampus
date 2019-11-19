package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.RolePermission;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RolePermissionDao {
    int saveRolePermissionList(List<RolePermission> rolePermissionList);

    @Select("select rid,pid from rolepermission where rid=#{rid}")
    List<RolePermission> getRolePermissionById(String rid);

    @Delete("delete from rolepermission where rid=#{rid}")
    int deleteByRoleId(String rid);
}
