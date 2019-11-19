package com.yihongda.smartcampus.exception;

/**
 * @author ldw
 * @date 2019年2月28日
 */
public class IllegalResponseException extends RuntimeException {

	private static final long serialVersionUID = 6378043246537735245L;

	public IllegalResponseException() {
		super();
	}

	public IllegalResponseException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalResponseException(String message) {
		super(message);
	}

	public IllegalResponseException(Throwable cause) {
		super(cause);
	}
}
