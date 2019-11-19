package com.yihongda.smartcampus.exception;

/**
 * @author ldw
 * @date 2019年2月28日
 */
public class IllegalRequestException extends RuntimeException {

	private static final long serialVersionUID = 6378043246537735245L;

	public IllegalRequestException() {
		super();
	}

	public IllegalRequestException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalRequestException(String message) {
		super(message);
	}

	public IllegalRequestException(Throwable cause) {
		super(cause);
	}
}
