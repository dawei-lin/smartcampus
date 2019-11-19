package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppType implements Serializable {
    private static final long serialVersionUID = -5898221027370996503L;
    private String id;
    @Size(min = 1, max = 50, message = "类别名长度不符合要求")
    private String tname;
    @Size(min = 1, max = 100, message = "描述长度不符合要求")
    private String tdesc;
    private String schoolid;
}
