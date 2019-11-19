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
public class SchoolInfo implements Serializable {
    private static final long serialVersionUID = -6671553957510200212L;
    //学校id
    private String id;
    //学校名字
    private String schoolname;
    //联系人
    private String contact;
    //联系人手机号
    private String tel;
    //学校logo
    private String logo;
    //背景图
    private String bgimg;
    //地址
    private String address;
    //学校类型
    private String schooltype;
}
