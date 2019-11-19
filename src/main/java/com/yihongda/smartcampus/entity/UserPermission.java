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
public class UserPermission implements Serializable {
    private static final long serialVersionUID = -5051309971329216000L;
    private String id;
    private String uid;
    private String pid;
}
