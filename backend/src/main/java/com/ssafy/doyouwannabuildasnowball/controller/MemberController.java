package com.ssafy.doyouwannabuildasnowball.controller;

import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.CustomUserDetails;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeRes;
import com.ssafy.doyouwannabuildasnowball.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;



    @GetMapping("/me")
    public ResponseEntity<MemberMeRes> loginMemberInformation(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
        return ResponseEntity.ok(memberService.findByLoginMember(member.getId()));
    }
}



