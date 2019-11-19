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
public class BaiduTranslationContent implements Serializable {
    private static final long serialVersionUID = -3430019340494307317L;
    private String src;
    private String dst;
}
