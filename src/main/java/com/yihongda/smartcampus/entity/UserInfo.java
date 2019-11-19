package com.yihongda.smartcampus.entity;

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
public class UserInfo implements Serializable {
    private static final long serialVersionUID = 2927672774197322399L;
    private String id;
    @Size(min = 1, max = 20, message = "账号长度不符合要求")
    private String username;
    @NotNull(message = "密码不能为空")
    private String password;
    @Size(min = 1, max = 20, message = "名字长度不符合要求")
    private String realname;
    private String code;
    @Size(min = 11, max = 11, message = "手机号长度不符合要求")
    private String tel;
    private Integer status;
    private String schoolid;
    private String roleid;
    private Date createtime;
    private String createip;
    private String createuser;
    private String auditor;
    private Date audittime;
    private Date lastlogintime;
    private String lastloginip;
    private Date recentlogintime;
    private String recentloginip;
    @Size(min = 4, max = 4, message = "验证码长度不符合要求")
    private String verifycode;
}
