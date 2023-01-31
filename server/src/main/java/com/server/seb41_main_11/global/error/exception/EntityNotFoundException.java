package com.server.seb41_main_11.global.error.exception;

import com.server.seb41_main_11.global.error.ErrorCode;

public class EntityNotFoundException extends BusinessException {

    public EntityNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }

}