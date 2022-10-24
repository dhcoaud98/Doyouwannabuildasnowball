package com.ssafy.doyouwannabuildasnowball.config.security.oauth.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.OAuthProcessingException;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.CustomUserDetails;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.OAuth2UserInfo;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.OAuth2UserInfoFactory;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.type.AuthProvider;
import com.ssafy.doyouwannabuildasnowball.domain.type.MemberRole;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    // OAuth2UserRequest에 있는 Access Token으로 유저정보 get
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        return process(oAuth2UserRequest, oAuth2User);
    }

    // 획득한 유저정보를 Java Model과 맵핑하고 프로세스 진행
    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

        // kakao, userinfo 정보 확인
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());

        // email이 없는 경우
        if (userInfo.getEmail().isEmpty()) {
            throw new OAuthProcessingException("Email not found from OAuth2 provider");
        }

        Optional<Member> userOptional = memberRepository.findByKakaoId(Long.valueOf(userInfo.getId()));
        Member member;

        // 이미 가입된 경우
        if (userOptional.isPresent()) {
            member = userOptional.get();
            if (authProvider != member.getAuthProvider()) {
                throw new OAuthProcessingException("Wrong Match Auth Provider");
            }

        } else {
            // 가입되지 않은 경우
            member = createMember(userInfo, authProvider);
        }
        return CustomUserDetails.create(member, oAuth2User.getAttributes());
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