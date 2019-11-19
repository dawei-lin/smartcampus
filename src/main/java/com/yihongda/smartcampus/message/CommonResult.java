package com.yihongda.smartcampus.message;

public class CommonResult {

    private String code = "200";
    private String msg = "success";

    public CommonResult success() {
        return this;
    }

    public CommonResult fail() {
        this.setCode("-1");
        this.setMsg("fail");
        return this;
    }

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public CommonResult(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public CommonResult() {
    }
}
