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
public class PlatformParam implements Serializable {
    private static final long serialVersionUID = 4268523588772690091L;
    private String appid;
    private Long timestamp;
    private String uid;
    private String schoolid;
    private String token;
}
