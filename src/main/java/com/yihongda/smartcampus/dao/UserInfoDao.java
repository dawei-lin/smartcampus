package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.LoginSuccessInfo;
import com.yihongda.smartcampus.entity.UserInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserInfoDao {
    @Select("select count(1) from userinfo where username=#{userName}")
    int getCountByUserName(String userName);

    @Insert("insert into userinfo(id,username,password,realname,code,tel,status,schoolid,roleid,createtime," +
            "createip,createuser,auditor,audittime,lastlogintime,lastloginip,recentlogintime,recentloginip) " +
            "values(uuid(),#{username},#{password},#{realname},#{code},#{tel},#{status},#{schoolid},#{roleid}," +
            "#{createtime},#{createip},#{createuser},#{auditor},#{audittime},#{lastlogintime},#{lastloginip}," +
            "#{recentlogintime},#{recentloginip})")
    int saveUserInfo(UserInfo userInfo);

    @Select("select ui.id,ui.username,ui.realname,ui.roleid,ri.rolename,ui.schoolid,si.schoolname from userinfo ui LEFT JOIN roleinfo ri " +
            "on ui.roleid=ri.id LEFT JOIN schoolinfo si on ui.schoolid=si.id where ui.username=#{userName} and ui.password=#{password} and ui.status=1")
    LoginSuccessInfo getLoginInfoByUserNameAndPassword(String userName, String password);

    @Select("select * from userinfo where id=#{uid} and (schoolid=#{schoolid} or schoolid is null)")
    UserInfo getUserInfoById(String uid, String schoolid);
}
