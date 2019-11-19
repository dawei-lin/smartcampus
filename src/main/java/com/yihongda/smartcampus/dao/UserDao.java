package com.yihongda.smartcampus.dao;

import com.yihongda.smartcampus.entity.User;
import com.yihongda.smartcampus.entity.UserInfo;
import com.yihongda.smartcampus.entity.UserParam;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserDao {
    @Insert("insert into userinfo(id,username,password,realname,code,tel,status,schoolid,roleid,createtime," +
            "createip,createuser,auditor,audittime,lastlogintime,lastloginip,recentlogintime,recentloginip) " +
            "values(uuid(),#{username},#{password},#{realname},#{code},#{tel},#{status},#{schoolid},#{roleid}," +
            "#{createtime},#{createip},#{createuser},#{auditor},#{audittime},#{lastlogintime},#{lastloginip}," +
            "#{recentlogintime},#{recentloginip})")
    int saveUser(User user);

    @Select("select count(1) from userinfo where username=#{userName}")
    int getCountByUserName(String userName);

    @Select("select id from userinfo where username=#{userName}")
    String getIdByUserName(String userName);

    @Select("select count(1) from userinfo where username=#{userName} and id!=#{id}")
    int getCountByIdAndUserName(String id, String userName);

    @Update("update userinfo set username=#{username},realname=#{realname},code=#{code},roleid=#{roleid},tel=#{tel},schoolid=#{schoolid} where id=#{id}")
    int updateUser(User user);

    @Delete("delete from userinfo where id=#{id}")
    int deleteUser(String id);

    List<User> getUserListByParam(UserParam userParam);

    List<User> getUnauditedUserListByParam(UserParam userParam);

    int saveUserList(List<User> userList);

    int updatePersonalInfo(User user);

    @Select("select distinct username from userinfo")
    List<String> getUserNameList();

    int getUserCount(UserParam userParam);

    @Select("select * from userinfo where id=#{id} and (schoolid=#{schoolid} or schoolid is null)")
    User getUserById(String id, String schoolid);

    @Update("update userinfo set status=1 where id=#{uid}")
    int authorize(String uid);

    @Update("update userinfo set status=#{status} where id=#{id}")
    int changeRoleStatus(UserInfo userInfo);
}
