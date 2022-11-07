package com.ssafy.doyouwannabuildasnowball.common.exception;

import com.google.gson.Gson;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(value = Exception.class)
    public String globalExceptionHandler(Exception e) {
        String message = new Gson().toJson(e.getMessage());
        System.out.println("error message: " + message);
        return message;
    }
}
