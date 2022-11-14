package com.ssafy.doyouwannabuildasnowball.controller;

import com.ssafy.doyouwannabuildasnowball.common.exception.DuplicateException;
import com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.CustomUserDetails;
import com.ssafy.doyouwannabuildasnowball.dto.member.request.MemberUpdateRequest;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeResponse;
import com.ssafy.doyouwannabuildasnowball.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
        try {
            MemberMeResponse memberMeResponse = memberService.userInfo(memberId);
            log.info("member : " + memberMeResponse.toString());
            return ResponseEntity.ok().body(memberMeResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<Void> updateUserInfo(@PathVariable Long memberId, @PathVariable String nickname) {
        try {
            MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(memberId, nickname);
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

    @DeleteMapping(value="/cookie")
    public ResponseEntity<Void> eraseCookie(HttpServletRequest request, HttpServletResponse response){
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if("refresh".equals(cookie.getName())) {
                cookie.setMaxAge(0);
                response.addCookie(cookie); // 응답 헤더에 추가해서 없어지도록 함
                log.info("cookie 제거 완료");
                break;
            }
        }
        return ResponseEntity.ok().build();
    }
}



