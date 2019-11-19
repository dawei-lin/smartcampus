package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.RoleInfo;
import com.yihongda.smartcampus.entity.RoleParam;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoleInfoDao {
    @Insert("insert into roleinfo(id,rolename,roledes,schoolid,status) values(uuid(),#{rolename},#{roledes},#{schoolid},#{status})")
    int saveRoleInfo(RoleInfo roleInfo);

    @Update("update roleinfo set rolename=#{rolename},roledes=#{roledes},schoolid=#{schoolid} where id=#{id}")
    int updateRoleInfo(RoleInfo roleInfo);

    @Delete("delete from roleinfo where id=#{id}")
    int deleteRoleInfo(String id);

    List<RoleInfo> getRoleListByParam(RoleParam roleParam);

    @Select("select id,rolename,roledes,schoolid,status from roleinfo where id=#{id} and (schoolid=#{schoolid} or schoolid is null)")
    RoleInfo getRoleById(String id, String schoolid);

    @Select("select id from roleinfo where rolename=#{rolename}")
    String getRoleIdByName(String rolename);

    @Select("select count(1) from roleinfo where rolename=#{rolename}")
    int getCountByRoleName(String rolename);

    @Select("select count(1) from roleinfo where rolename=#{rolename} and id!=#{id}")
    int getCountByRoleNameAndId(String rolename, String id);

    @Update("update roleinfo set status=#{status} where id=#{id}")
    int changeRoleStatus(RoleInfo roleInfo);

    int getRoleCount(RoleParam roleParam);
}
