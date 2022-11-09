package com.ssafy.doyouwannabuildasnowball.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.CustomUserDetails;
import com.ssafy.doyouwannabuildasnowball.domain.Friend;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendDtoInterface;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendRes;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendStatusRes;
import com.ssafy.doyouwannabuildasnowball.dto.friend.common.AllRequestReq;
import com.ssafy.doyouwannabuildasnowball.service.FriendService;


@RestController
@RequiredArgsConstructor
@RequestMapping("/friend")
@Slf4j
public class FriendController {

    private final FriendService friendService;
    
	// 친구 요청
    @PostMapping("/request")
    public ResponseEntity<List<FriendRes>> request(@RequestBody AllRequestReq allRequestDto) {
    	
        return ResponseEntity.ok(friendService.request(allRequestDto.getSendMemberId(), allRequestDto.getReceiveMemberId()));
    }
	
	// 친구 요청 승낙
    @PatchMapping("/request/{friendId}")
    public ResponseEntity<List<FriendRes>> approveRequest(@PathVariable Long friendId, @ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {

        return ResponseEntity.ok(friendService.approveRequest(friendId, member.getId()));
    }
    
    // 친구 유무
    @GetMapping("status/{checkMemberId}")
    public ResponseEntity<FriendStatusRes> getFriendStatus(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member, @PathVariable Long checkMemberId) {
    	
    	return ResponseEntity.ok(friendService.getFriendStatus(member.getId(), checkMemberId));
//        return ResponseEntity.ok(friendService.getFriendStatus(myMemberId, yourMemberId));
//        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
    
	
	// 내 친구 관련 정보 목록
    @GetMapping("/list")
    public ResponseEntity<List<FriendRes>> getAllFriendInfo(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
    	
    	// 받은 친구 요청 목록
//    	friendService.getAllRequests(userId);
    	// 승낙 안 된 보낸 친구 요청 목록
//    	friendService.getAllSendRequests(userId);
    	// 내 친구 목록
//    	friendService.getAllFriends(userId);

//        return ResponseEntity.ok(friendService.getAllFriendInfo(userId));
    	
//        return ResponseEntity.ok(friendService.getAllFriendInfo01(userId));
    	return ResponseEntity.ok(friendService.getAllFriendInfo01(member.getId()));
//        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
	
	// 내 친구 삭제
    // 친구 목록 반환
    @DeleteMapping("/list/{friendId}")
    public ResponseEntity<List<FriendRes>> deleteFriend(@PathVariable Long friendId, @ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {

        return ResponseEntity.ok(friendService.deleteFriend(friendId, member.getId()));
    }
	
	
	// 친구 검색
    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<FriendRes>> searchFriend(@PathVariable String keyword, @ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {


    	return ResponseEntity.ok(friendService.searchFriend(member.getId(), keyword));
    }
	
    
	// 스노우볼 요청 보내기
    @PostMapping("/snowglobe/request")
    public ResponseEntity<String> requestSnowglobe(@RequestBody AllRequestReq allRequestDto) {

    	String result = friendService.requestSnowglobe(allRequestDto.getSendMemberId(), allRequestDto.getReceiveMemberId());
    	
        return ResponseEntity.ok(result);
    }
	
	
	// 받은 스노우볼 요청 삭제
    // 친구 목록 반환
    @DeleteMapping("/snowglobe/request")
    public ResponseEntity<List<FriendRes>> deleteSnowglobeRequest(@RequestBody AllRequestReq allRequestDto) {
    	
    	return ResponseEntity.ok(friendService.deleteSnowglobeRequest(allRequestDto.getSendMemberId(), allRequestDto.getReceiveMemberId()));

    }
	
}
