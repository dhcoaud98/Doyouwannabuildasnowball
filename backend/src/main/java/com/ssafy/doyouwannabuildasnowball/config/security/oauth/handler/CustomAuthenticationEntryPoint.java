package com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.doyouwannabuildasnowball.common.dto.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {



    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.info("[CustomAuthenticationEntryPoint] commence");
        String body = objectMapper.writeValueAsString(ExceptionResponse.from("로그인이 필요한 서비스입니다."));

        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
        response.getWriter().write(body);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());


    }
}
