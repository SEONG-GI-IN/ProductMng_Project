package com.dev.ProductMng.config;

public class APIException extends RuntimeException{
    String errCode = "XX_9999";

    public String getErrCode() {
        return this.errCode;
    }

    public APIException(String errCode, String message) {
        super(message);
        this.errCode = errCode;
    }

    /** @deprecated */
    @Deprecated
    public APIException(String message) {
        super(message);
    }

    public APIException(Throwable cause) {
        super(cause);
    }
}
