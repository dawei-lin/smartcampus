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
public class UseApp implements Serializable {
    private static final long serialVersionUID = -3334845817453662739L;
    private String id;
    private String uid;
    private String aid;
    private Integer type;
    private Integer sn;
    private String token;
}
