package com.yihongda.smartcampus.message;

/**
 * @author ldw
 * @date 2019/7/19 9:53
 */
public class CommonParam<T> {
    private T t;
    private Integer pageNum;
    private Integer pageSize;

    public T getT() {
        return t;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setT(T t) {
        this.t = t;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public CommonParam(T t, Integer pageNum, Integer pageSize) {
        this.t = t;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
    }

    public CommonParam() {
    }
}
