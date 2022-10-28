package com.ssafy.doyouwannabuildasnowball.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotFoundException extends RuntimeException{

    public static final String MEMBER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String CATEGORY_NOT_FOUND = "존재하지 않는 카테고리입니다.";
    public static final String ELEMENT_NOT_FOUND = "존재하지 않는 요소입니다.";
    public static final String FRIEND_NOT_FOUND = "존재하지 않는 친구입니다.";
    public static final String SNOWGLOBE_NOT_FOUND = "존재하지 않는 스노우볼입니다.";
    public static final String MUSIC_NOT_FOUND = "존재하지 않는 음악입니다.";
    public static final String REQUEST_NOT_FOUND = "존재하지 않는 요청입니다.";
    public static final String BOARD_NOT_FOUND = "존재하지 않는 게시글 입니다.";

    public NotFoundException(String message) {
        super(message);
    }

}
