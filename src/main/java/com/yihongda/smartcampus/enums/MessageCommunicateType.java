package com.yihongda.smartcampus.enums;

public enum MessageCommunicateType {
    INDEX("index"),
    SEND("send"),
    RECEIVE("receive");

    private String communicateName;

    public String getCommunicateName() {
        return communicateName;
    }

    public void setCommunicateName(String communicateName) {
        this.communicateName = communicateName;
    }

    MessageCommunicateType() {
    }

    MessageCommunicateType(String communicateName) {
        this.communicateName = communicateName;
    }
}
