package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserParam extends BaseEntity implements Serializable {
    private static final long serialVersionUID = -2489973023974372150L;
    private String username;
    private String realname;
    private String tel;
    private String code;
    private String roleid;
    private Integer status;
    private String schoolid;
}
