package com.ssafy.doyouwannabuildasnowball.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */

    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    MEMBER_NOT_FOUND(NOT_FOUND, "유효하지 않은 회원입니다."),
    SNOWGLOBE_NOT_FOUND(NOT_FOUND, "유효하지 않은 스노우볼입니다."),
    DECORATION_NOT_FOUND(NOT_FOUND, "유효하지 않은 장식입니다."),
    MUSIC_NOT_FOUND(NOT_FOUND, "유효하지 않은 음악입니다."),
    FRIEND_NOT_FOUND(NOT_FOUND, "유효하지 않은 친구 관계입니다."),
    BOARD_NOT_FOUND(NOT_FOUND, "유효하지 않은 게시판입니다."),
    FILE_NOT_FOUND(NOT_FOUND, "유효하지 않은 파일입니다."),
    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    FRIEND_DUPLICATE_RESOURCE(CONFLICT, "이미 존재하는 친구 요청입니다."),
    SNOWGLOBE_REQUEST_DUPLICATE_RESOURCE(CONFLICT, "이미 보낸 요청이 있어요."),
    NICKNAME_DUPLICATE_RESOURCE(CONFLICT, "이미 존재하는 닉네임입니다."),

    /* 401 BAD_REQUEST : 잘못된 redirect uri 정보 */
    BAD_REQUEST_URI(BAD_REQUEST ,"redirect URIs are not matched"),

    /* 401 BAD_REQUEST : 잘못된 redirect uri 정보 */
    UNMATCHED_AUTH_PROVIDER(UNAUTHORIZED ,"Unauthorized auth provider"),
    UNMATCHED_MEMBER(UNAUTHORIZED ,"Member Id is not matched"),



    ;

	
    private final HttpStatus httpStatus;
    private final String detail;

}
