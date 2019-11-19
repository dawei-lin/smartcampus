package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginSuccessInfo implements Serializable {
    private static final long serialVersionUID = -6915844430827824187L;
    private String id;
    private String username;
    private String realname;
    private String schoolid;
    private String schoolname;
    private String roleid;
    private String rolename;
    private String token;
}
