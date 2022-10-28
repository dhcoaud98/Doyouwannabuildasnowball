package com.ssafy.doyouwannabuildasnowball.controller;

import com.ssafy.doyouwannabuildasnowball.common.exception.DuplicateException;
import com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException;
import com.ssafy.doyouwannabuildasnowball.dto.member.request.MemberUpdateRequest;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeResponse;
import com.ssafy.doyouwannabuildasnowball.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;



    @GetMapping("/me/{memberId}")
    public ResponseEntity<MemberMeResponse> getUserInfo(@PathVariable Long memberId) {
        try {
            MemberMeResponse memberMeResponse = memberService.userInfo(memberId);
            log.info("member : " + memberMeResponse.toString());
            return ResponseEntity.ok().body(memberMeResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/info")
    public ResponseEntity<Void> updateUserInfo(@RequestBody MemberUpdateRequest memberUpdateRequest) {
        try {
            memberService.updateUserInfo(memberUpdateRequest);
        } catch (DuplicateException | NotFoundException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/confirm/{nickname}")
    public ResponseEntity<Boolean> confirmDuplicateNickname(@PathVariable String nickname) {
        Boolean isDuplicated = memberService.confirmDuplicateNickname(nickname);
        return ResponseEntity.ok(isDuplicated);
    }
}



