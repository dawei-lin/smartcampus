package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoleInfo implements Serializable {
    private static final long serialVersionUID = 7106754766898309825L;
    private String id;
    @Size(min = 1, max = 50, message = "角色名字长度不符合要求")
    private String rolename;
    private String roledes;
    private String schoolid;
    private List<String> pids;
    private String pidstr;
    private Integer status;
    private List<Permission> permissionList;
}
