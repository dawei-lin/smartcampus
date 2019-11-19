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
public class AppInfoParam extends BaseEntity implements Serializable {
    private static final long serialVersionUID = -2086073204009011147L;
    private String appname;
    private String tname;
    private String company;
    private Integer status;
}
