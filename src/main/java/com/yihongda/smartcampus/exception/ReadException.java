package com.yihongda.smartcampus.exception;

/**
 * @author ldw
 * @date 2019年2月28日
 */
public class ReadException extends RuntimeException{
	/**
     * 序列化ID
     */
    private static final long serialVersionUID = 6378043246537735245L;

	public ReadException() {
	    super();
    }

	public ReadException(String message, Throwable cause) {
	    super(message, cause);
	}

	public ReadException(String message) {
	    super(message);
    }

	public ReadException(Throwable cause) {
	    super(cause);
    }

}
