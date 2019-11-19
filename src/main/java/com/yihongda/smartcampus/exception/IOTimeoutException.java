package com.yihongda.smartcampus.exception;

/**
 * @author ldw
 * @date 2019年2月28日
 */
public class IOTimeoutException extends RuntimeException {
	/**
	 * 序列化ID
	 */
	private static final long serialVersionUID = 6378043246537735245L;

	public IOTimeoutException() {
		super();
	}

	public IOTimeoutException(String message, Throwable cause) {
		super(message, cause);
	}

	public IOTimeoutException(String message) {
		super(message);
	}

	public IOTimeoutException(Throwable cause) {
		super(cause);
	}

}
