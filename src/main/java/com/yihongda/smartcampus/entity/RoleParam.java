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
public class RoleParam extends BaseEntity implements Serializable {
    private static final long serialVersionUID = -3585518523533724678L;
    private String rolename;
    private Integer status;
    private String schoolid;
}
