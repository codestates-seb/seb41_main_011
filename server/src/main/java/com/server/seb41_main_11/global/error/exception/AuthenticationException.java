package com.server.seb41_main_11.global.error.exception;

import com.server.seb41_main_11.global.error.ErrorCode;

public class AuthenticationException extends BusinessException {

    public AuthenticationException(ErrorCode errorCode) {
        super(errorCode);
    }

}