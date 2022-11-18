package com.ssafy.doyouwannabuildasnowball.controller;

import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.CustomUserDetails;
import com.ssafy.doyouwannabuildasnowball.dto.member.request.MemberUpdateRequest;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeResponse;
import com.ssafy.doyouwannabuildasnowball.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;



    @GetMapping("/me")
    public ResponseEntity<MemberMeResponse> loginMemberInformation(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
        return ResponseEntity.ok(memberService.findByLoginMember(member.getId()));
    }

    @GetMapping("/info/{memberId}")
    public ResponseEntity<MemberMeResponse> getUserInfo(@PathVariable Long memberId) {
        MemberMeResponse memberMeResponse = memberService.userInfo(memberId);
        log.info("member : " + memberMeResponse.toString());
        return ResponseEntity.ok().body(memberMeResponse);
    }

    @PatchMapping("/update")
    public ResponseEntity<Void> updateUserInfo(@PathVariable Long memberId, @PathVariable String nickname) {
            MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(memberId, nickname);
            memberService.updateUserInfo(memberUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/confirm/{nickname}")
    public ResponseEntity<Boolean> confirmDuplicateNickname(@PathVariable String nickname) {
        Boolean isDuplicated = memberService.confirmDuplicateNickname(nickname);
        return ResponseEntity.ok(isDuplicated);
    }


    @PostMapping("/logout/{memberId}")
    public ResponseEntity<Void> logout(@PathVariable Long memberId) {
        memberService.logout(memberId);
        return ResponseEntity.ok().build();
    }
}



