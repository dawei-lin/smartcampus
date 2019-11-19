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
public class PlatformResult implements Serializable {
    private static final long serialVersionUID = 8589753017414747772L;
    private String appid;
    private String token;
    private Long timestamp;
    private String keyinfo;
    private String responseurl;
}
