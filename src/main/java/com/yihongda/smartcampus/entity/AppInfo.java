package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppInfo implements Serializable {
    private static final long serialVersionUID = -5274277989721275143L;
    private String id;
    @Size(min = 1, max = 50, message = "名字长度不符合要求")
    private String appname;
    @Size(min = 1, max = 100, message = "应用地址长度不符合要求")
    private String appurl;
    private String applogo;
    @NotEmpty(message = "应用类别不能为空")
    private String apptype;
    private String tname;
    @Size(min = 1, max = 50, message = "产商名长度不符合要求")
    private String company;
    @Size(min = 1, max = 20, message = "联系人长度不符合要求")
    private String contact;
    @Size(min = 11, max = 11, message = "联系电话长度不符合要求")
    private String tel;
    private String connectkey;
    private String connectkey2;
    @Size(min = 1, max = 50, message = "key长度不符合要求")
    private String connectid;
    private Boolean bmess;
    private Integer status;
    private Date accesstime;
    private Integer accesstype;
    private String indexurl;
    private String sendmessurl;
    private String receivemessurl;
}
