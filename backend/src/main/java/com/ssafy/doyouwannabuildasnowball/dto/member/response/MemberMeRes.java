package com.ssafy.doyouwannabuildasnowball.dto.member.response;

import com.ssafy.doyouwannabuildasnowball.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberMeRes {
    private Long id;

    private String name;

    private String nickname;

    private String phone;

    private String email;

    private String profileImageUrl;


    public static MemberMeRes of(Member member) {
        return MemberMeRes.builder()
                .id(member.getMemberId())
                .name(member.getName())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
    }
}
