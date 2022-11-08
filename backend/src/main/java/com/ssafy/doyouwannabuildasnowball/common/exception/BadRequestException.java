package com.ssafy.doyouwannabuildasnowball.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException{

    public static final String MEMBER_BAD_REQUEST = "유효하지 않은 회원입니다.";
    public static final String SNOWGLOBE_BAD_REQUEST = "유효하지 않은 스노우볼입니다.";
    public static final String DECORATION_BAD_REQUEST = "유효하지 않은 요소입니다.";
    public static final String MUSIC_BAD_REQUEST = "유효하지 않은 음악입니다.";

    public BadRequestException(String message) {
        super(message);
    }
}
