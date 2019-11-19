package com.yihongda.smartcampus.enums;

public enum SchoolType {
    KINDERGARTEN("1", "幼儿园"),
    PRIMARY_SCHOOL("2", "小学"),
    MIDDLE_SCHOOL("3", "中学");
    private String schooltype;
    private String schoolName;

    public String getSchooltype() {
        return schooltype;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchooltype(String schooltype) {
        this.schooltype = schooltype;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    SchoolType(String schooltype, String schoolName) {
        this.schooltype = schooltype;
        this.schoolName = schoolName;
    }

    SchoolType() {
    }
}
