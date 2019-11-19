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
public class AppInfoResponse implements Serializable {
    private static final long serialVersionUID = 6201769512983880768L;
    private String tname;
    private List<AppInfo> children;
}
