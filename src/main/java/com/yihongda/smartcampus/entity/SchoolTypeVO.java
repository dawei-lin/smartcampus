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
public class SchoolTypeVO implements Serializable {
    private static final long serialVersionUID = 6898406306125510960L;
    private String schooltype;
    private String schoolname;
}
