package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {
    private static final long serialVersionUID = -1195538766629216348L;
    private String id;
    @Size(min = 1, max = 20, message = "账号长度不符合要求")
    private String username;
    private String password;
    @Size(min = 11, max = 11, message = "手机号长度不符合要求")
    private String tel;
    private String schoolid;
    private String realname;
}
