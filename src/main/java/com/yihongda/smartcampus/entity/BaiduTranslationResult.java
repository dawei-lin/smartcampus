package com.yihongda.smartcampus.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaiduTranslationResult implements Serializable {
    private static final long serialVersionUID = 7245222845471740263L;
    private String from;
    private String to;
    private List<BaiduTranslationContent> trans_result;
}
