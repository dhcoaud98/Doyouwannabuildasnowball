package com.ssafy.doyouwannabuildasnowball.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicateException extends RuntimeException{

    public static final String USER_NICKNAME_DUPLICATE = "이미 존재하는 닉네임입니다.";
    public static final String FRIEND_DUPLICATE = "이미 존재하는 친구 관계입니다.";

    public DuplicateException(String message) {
        super(message);
    }

}
