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
public class BaseUserInfo implements Serializable {
    private static final long serialVersionUID = 1443647250651304157L;
    private String code;
    private String errmsg;
    private String useid;
    private String realname;
    private String icon;
    private String roleid;
    private String rolename;
    private String schoolid;
    private String schoolname;
}
