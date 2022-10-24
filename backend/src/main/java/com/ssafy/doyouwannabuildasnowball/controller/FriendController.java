package com.ssafy.doyouwannabuildasnowball.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/friend")
@Slf4j
public class FriendController {
    @GetMapping("/test")
    public ResponseEntity testController() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }

	
	// 친구 요청
    @PostMapping("/request")
    public ResponseEntity request() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 친구 요청 승낙
    @PatchMapping("/request")
    public ResponseEntity approveRequest() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 내 친구 목록
    @GetMapping("/list/{userId}")
    public ResponseEntity getAllFriend() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 내 친구 삭제
    @DeleteMapping("/list/{friendId}")
    public ResponseEntity deleteFriend() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 받은 친구 요청 목록
    @GetMapping("/request/list/{userId}")
    public ResponseEntity getAllRequest() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 받은 친구 요청 삭제
    @DeleteMapping("/request/{friendId}")
    public ResponseEntity deleteRequest() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 친구 검색
    @GetMapping("/search/{keyword}")
    public ResponseEntity searchFriend() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 스노우볼 요청 보내기
    @PostMapping("/snowglobe/request")
    public ResponseEntity requestSnowglobe() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 받은 스노우볼 요청 목록
    @GetMapping("/snowglobe/request/list/{userId}")
    public ResponseEntity getAllRequestSnowglobe() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
	// 받은 스노우볼 요청 삭제
    @DeleteMapping("/snowglobe/request")
    public ResponseEntity deleteRequestSnowglobe() {
        System.out.println("he");
        log.info("hehehehhe");
        return ResponseEntity.ok("테스트");
    }
	
}
