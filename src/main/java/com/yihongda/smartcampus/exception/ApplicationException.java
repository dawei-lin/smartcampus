package com.yihongda.smartcampus.exception;

public class ApplicationException extends Exception {

	private static final long serialVersionUID = 6070782650003054687L;

	public static final String APPLICTION_ERR_CODE = "-4";

	private String errorCode = null;

	public ApplicationException() {
		errorCode = APPLICTION_ERR_CODE;
	}

	public ApplicationException(String errorCode) {
		super("");

		this.errorCode = errorCode;
	}

	public ApplicationException(String errorCode, String message) {
		super(message);

		this.errorCode = errorCode;
	}

	public ApplicationException(String errorCode, String message, Throwable cause) {
		super(message, cause);

		this.errorCode = errorCode;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

}
