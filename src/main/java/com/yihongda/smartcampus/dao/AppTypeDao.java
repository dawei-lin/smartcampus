package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.AppType;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AppTypeDao {
    @Insert("insert into apptype(id,tname,tdesc,schoolid) values(uuid(),#{tname},#{tdesc},#{schoolid})")
    int saveAppType(AppType appType);

    @Update("update apptype set tname=#{tname},tdesc=#{tdesc},schoolid=#{schoolid} where id=#{id}")
    int updateAppType(AppType appType);

    List<AppType> getAppTypeListByName(String tname, String schoolid);

    @Select("select count(1) from apptype where tname=#{tname}")
    int getCountByName(String tname);

    @Select("select count(1) from apptype where id!=#{id} and tname=#{tname}")
    int getCountByIdAndName(String id, String tname);

    @Select("select id,tname from apptype where (schoolid=#{schoolid} or schoolid is null)")
    List<AppType> getAppTypeList(String schoolid);

    @Delete("delete from apptype where id=#{id}")
    int deleteAppType(String id);

    @Select("select id,tname,tdesc,schoolid from apptype where id=#{id} and (schoolid=#{schoolid} or schoolid is null)")
    AppType getAppTypeById(String id, String schoolid);
}
