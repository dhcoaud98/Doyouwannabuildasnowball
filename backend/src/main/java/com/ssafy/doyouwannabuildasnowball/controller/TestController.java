package com.ssafy.doyouwannabuildasnowball.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
@Slf4j
public class TestController {
    @GetMapping("/test")
    public ResponseEntity testController() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
}
