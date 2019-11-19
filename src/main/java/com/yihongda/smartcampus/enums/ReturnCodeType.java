package com.yihongda.smartcampus.enums;

public enum ReturnCodeType {

    //系统通用返回值
    NORMAL_STATE(0),
    SERVER_ERROR(1, "服务器错误"),
    PARAMETER_INVALID(2, "参数无效"),
    ACCESS_DENIED(3, "访问被拒绝"),
    NAME_REPEAT(4, "名字重复"),
    SCHOOL_NO_EXIST(5, "学校不存在"),
    VERIFY_CODE_ERROR(6, "验证码错误");
    private int code;
    private String msg;

    ReturnCodeType(int code) {
        this.code = code;
    }

    ReturnCodeType(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getStringCode() {
        return String.valueOf(code);
    }

    public String getMsg() {
        return msg;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public static ReturnCodeType getByCode(int code) {
        for (ReturnCodeType type : ReturnCodeType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }
        return ReturnCodeType.NORMAL_STATE;
    }


}
