package com.ssafy.doyouwannabuildasnowball.dto.member.response;

import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.type.AuthProvider;
import com.ssafy.doyouwannabuildasnowball.domain.type.MemberRole;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MemberMeResponse {
    private Long memberId;

    private Long kakaoId;

    private String name;

    private String nickname;

    private String email;


    private AuthProvider authProvider;


    private String refreshToken;

    private MemberRole role;

    private String profileImageUrl;

    private Long snowglobeId;

    public static MemberMeResponse of(Member member) {
        return MemberMeResponse.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileImageUrl(member.getProfileImageUrl())
                .snowglobeId(member.getSnowglobe().getSnowglobeId())
                .build();
    }
}
