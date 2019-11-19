package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPermissionDTO implements Serializable {
    private static final long serialVersionUID = 6539340932625185236L;
    @NotNull(message = "用户id不能为空")
    private String uid;
    private List<String> pids;
}
