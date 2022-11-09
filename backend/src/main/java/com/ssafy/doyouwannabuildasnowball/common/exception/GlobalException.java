package com.ssafy.doyouwannabuildasnowball.common.exception;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalException {
    @ExceptionHandler(value = Exception.class)
    public String globalExceptionHandler(Exception e) {
        String message = new Gson().toJson(e.getMessage());
        log.info("error message: " + message);
        return message;
    }

}
