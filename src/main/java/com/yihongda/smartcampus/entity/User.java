package com.yihongda.smartcampus.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    private static final long serialVersionUID = -3170769340613686661L;
    private String id;
    @Size(min = 1, max = 20, message = "账号长度不符合要求")
    @Excel(name = "用户名", orderNum = "0")
    private String username;
    private String password;
    @Size(min = 1, max = 20, message = "名字长度不符合要求")
    @Excel(name = "姓名", orderNum = "1")
    private String realname;
    @Size(min = 1, max = 20, message = "学号长度不符合要求")
    @Excel(name = "学号", orderNum = "2")
    private String code;
    @Size(min = 11, max = 11, message = "手机号长度不符合要求")
    @Excel(name = "手机号", orderNum = "3")
    private String tel;
    private Integer status;
    private String schoolid;
    private String schoolname;
    @NotNull(message = "角色不能为空")
    private String roleid;
    private String rolename;
    private Date createtime;
    private String createip;
    private String createuser;
    private String auditor;
    private Date audittime;
    private Date lastlogintime;
    private String lastloginip;
    private Date recentlogintime;
    private String recentloginip;
}
