package com.ssafy.doyouwannabuildasnowball.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotMatchException extends RuntimeException{

    public static final String CONTENT_TYPE_NOT_MATCH = "파일 타입이 다릅니다.";

    public NotMatchException(String message) {
        super(message);
    }
}
