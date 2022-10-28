package com.ssafy.doyouwannabuildasnowball.domain;

import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import com.ssafy.doyouwannabuildasnowball.domain.type.AuthProvider;
import com.ssafy.doyouwannabuildasnowball.domain.type.MemberRole;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "kakao_id")
    private Long kakaoId;

    @Column(length = 100)
    private String name;

    @Column(unique = true, length = 100)
    private String nickname;

    @Column(length = 100)
    private String email;


    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;


    private String refreshToken;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Column(length = 200)
    private String profileImageUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_id")
    private Snowglobe snowglobe;
}
