package com.yihongda.smartcampus.exception;

/**
 * @author ldw
 * @date 2019年2月28日
 */
public class WriteException extends RuntimeException {
	/**
	 * 序列化ID
	 */
	private static final long serialVersionUID = 6378043246537735245L;

	public WriteException() {
		super();
	}

	public WriteException(String message, Throwable cause) {
		super(message, cause);
	}

	public WriteException(String message) {
		super(message);
	}

	public WriteException(Throwable cause) {
		super(cause);
	}

}
