package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.AppInfo;
import com.yihongda.smartcampus.entity.AppInfoParam;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AppInfoDao {
    @Insert("insert into appinfo(id,appname,appurl,applogo,apptype,company,contact,tel,connectkey,connectid,bmess,status,accesstime,accesstype) " +
            "values(uuid(),#{appname},#{appurl},#{applogo},#{apptype},#{company},#{contact},#{tel},#{connectkey},#{connectid},#{bmess},#{status},#{accesstime},#{accesstype})")
    int saveAppInfo(AppInfo appInfo);

    @Update("update appinfo set appname=#{appname},appurl=#{appurl},applogo=#{applogo},apptype=#{apptype},company=#{company}," +
            "contact=#{contact},tel=#{tel},connectkey=#{connectkey},connectid=#{connectid},bmess=#{bmess} where id=#{id}")
    int updateAppInfo(AppInfo appInfo);

    @Update("update appinfo set status=#{status} where id=#{id}")
    int updateAppInfoStatus(AppInfo appInfo);

    @Delete("delete from appinfo where id=#{id}")
    int deleteAppInfo(String id);

    @Select("select count(1) from appinfo where appname=#{appname}")
    int getCountByAppName(String appname);

    @Select("select count(1) from appinfo where id!=#{id} and appname=#{appname}")
    int getCountByIdAndAppName(String id, String appname);

    List<AppInfo> getAppInfoListByParam(AppInfoParam appInfoParam);

    @Select("select ai.id id,ai.appname appname,at.tname tname,ai.appurl appurl,ai.applogo applogo,ai.company company,ai.contact contact,ai.tel tel" +
            " FROM appinfo ai inner join apptype at on ai.apptype=at.id where ai.apptype=#{apptype} and ai.status=1")
    List<AppInfo> getAppInfoListByAppType(String apptype);

    @Select("select id,appname from appinfo where bmess=1")
    List<AppInfo> getInformationCenter();

    @Select("SELECT ai.* from useapp ua INNER JOIN userinfo ui on ua.uid=ui.id INNER JOIN appinfo ai on ua.aid=ai.id and ai.status=1")
    List<AppInfo> getUseApp(String uid);

    @Select("SELECT ai.* from useapp ua INNER JOIN userinfo ui on ua.uid=ui.id INNER JOIN appinfo ai on ua.aid=ai.id where ua.type=1 and ai.status=1")
    List<AppInfo> getCommonUseApp(String uid);

    @Update("update useapp set type=#{type} where uid=#{uid} and aid=#{aid}")
    int changeUseAppType(String uid, String aid, Integer type);

    int getAppCount(AppInfoParam appInfoParam);

    @Select("select * from appinfo where id=#{id}")
    AppInfo getAppInfoById(String id);

    @Insert("insert into useapp(id,uid,aid,type,token) values(uuid(),#{uid},#{aid},0,#{token})")
    int saveUseApp(String uid, String aid, String token);
}
