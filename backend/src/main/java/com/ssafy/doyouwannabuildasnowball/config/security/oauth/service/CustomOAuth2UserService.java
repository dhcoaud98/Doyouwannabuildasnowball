package com.ssafy.doyouwannabuildasnowball.config.security.oauth.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.OAuthProcessingException;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.CustomUserDetails;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.KakaoOAuth2UserInfo;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.OAuth2UserInfo;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.OAuth2UserInfoFactory;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.type.AuthProvider;
import com.ssafy.doyouwannabuildasnowball.domain.type.MemberRole;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import com.ssafy.doyouwannabuildasnowball.service.MemberService;
import com.ssafy.doyouwannabuildasnowball.service.SnowglobeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    private final MemberService memberService;
    private final HttpSession httpSession;
    // OAuth2UserRequest에 있는 Access Token으로 유저정보 get
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String accessToken = oAuth2UserRequest.getAccessToken().getTokenValue();
        System.out.println("accessToken = " + accessToken);
        KakaoOAuth2UserInfo kakaoOAuth2UserInfo = new KakaoOAuth2UserInfo(attributes);
        log.info("id : " + kakaoOAuth2UserInfo.getId());
        log.info("nick name : " + kakaoOAuth2UserInfo.getName());
        log.info("e-mail : " + kakaoOAuth2UserInfo.getEmail());

        httpSession.setAttribute("login_info", attributes);
        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),attributes, "id");
//        return process(oAuth2UserRequest, oAuth2User);
    }

    // 획득한 유저정보를 Java Model과 맵핑하고 프로세스 진행
    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

        // kakao, userinfo 정보 확인
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());
        Map<String, Object> attributes = oAuth2User.getAttributes();
        KakaoOAuth2UserInfo kakaoOAuth2UserInfo = new KakaoOAuth2UserInfo(attributes);
        log.info("id : " + kakaoOAuth2UserInfo.getId());
        log.info("nick name : " + kakaoOAuth2UserInfo.getName());
        log.info("e-mail : " + kakaoOAuth2UserInfo.getEmail());

        //         email이 없는 경우
        if (userInfo.getEmail().isEmpty()) {
            throw new OAuthProcessingException("Email not found from OAuth2 provider");
        }

        Optional<Member> userOptional = memberRepository.findByKakaoId(Long.valueOf(userInfo.getId()));
        Member member;


        // 사용자가 이미 회원가입 되어있는 경우
        if(userOptional.isPresent()) {
            member = userOptional.get();
            if (authProvider != member.getAuthProvider()) {
                throw new OAuthProcessingException("Wrong Match Auth Provider");
            }
        }
        else {
            member = createMember(userInfo, authProvider);
            // 기본 스노우볼 생성
            memberService.makeDefaultSnowglobe(member.getMemberId());
        }
        return CustomUserDetails.create(member, oAuth2User.getAttributes());

//        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
//                attributes, "id");

    }

    private Member createMember(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        Member member = Member.builder()
//                .nickname(userInfo.getName())
                .email(userInfo.getEmail())
                .kakaoId(Long.valueOf(userInfo.getId()))
                .profileImageUrl(userInfo.getImageUrl())
                .role(MemberRole.ROLE_MEMBER)
                .authProvider(authProvider)
                .build();
        return memberRepository.save(member);
    }
}