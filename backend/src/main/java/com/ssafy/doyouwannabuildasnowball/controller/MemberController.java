package com.ssafy.doyouwannabuildasnowball.controller;

import com.nimbusds.openid.connect.sdk.UserInfoRequest;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.CustomUserDetails;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.dto.member.request.MemberUpdateRequest;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeRes;
import com.ssafy.doyouwannabuildasnowball.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;



    @GetMapping("/me/{memberId}")
    public ResponseEntity<Member> userInfo(@PathVariable String memberId) {
        return ResponseEntity.ok(memberService.userInfo(memberId));
    }

    @PatchMapping("/info")
    public ResponseEntity<Void> updateUserInfo(@RequestBody MemberUpdateRequest memberUpdateRequest) {
        memberService.updateUserInfo(memberUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/confirm/{nickname}")
    public ResponseEntity<Boolean> confirmDuplicateNickname(@PathVariable String nickname) {
        Boolean isDuplicated = memberService.confirmDuplicateNickname(nickname);
        return ResponseEntity.ok(isDuplicated);
    }
}



