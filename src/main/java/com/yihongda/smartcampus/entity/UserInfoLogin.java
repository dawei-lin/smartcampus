package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoLogin implements Serializable {
    private static final long serialVersionUID = -8277485883520330744L;
    @Size(min = 1, max = 20, message = "账号长度不符合要求")
    private String username;
    @NotNull(message = "密码不能为空")
    private String password;
    @Size(min = 4, max = 4, message = "验证码长度不符合要求")
    private String verifycode;
}
