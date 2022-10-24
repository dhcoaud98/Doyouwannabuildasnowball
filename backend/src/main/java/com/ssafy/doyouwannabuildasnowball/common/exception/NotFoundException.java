package com.ssafy.doyouwannabuildasnowball.common.exception;

public class NotFoundException extends RuntimeException{

    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String RIDEROOM_NOT_FOUND = "존재하지 않는 그룹방입니다.";
    public static final String COURSE_NOT_FOUND = "존재하지 않는 코스입니다.";
    public static final String RECORD_NOT_FOUND = "존재하지 않는 기록입니다.";
    public static final String TAG_NOT_FOUND = "존재하지 않는 태그입니다.";
    public static final String BOOKMARK_NOT_FOUND = "존재하지 않는 북마크입니다.";
    public static final String REVIEW_NOT_FOUND = "존재하지 않는 리뷰입니다.";


    public NotFoundException(String message) {
        super(message);
    }

}
