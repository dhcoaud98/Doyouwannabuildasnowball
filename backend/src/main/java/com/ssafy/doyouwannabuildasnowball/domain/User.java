package com.ssafy.doyouwannabuildasnowball.domain;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String email;

    @Column(name = "oauth_id")
    private Long oauthId;

    @Column(unique = true, length = 100)
    private String nickname;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_id")
    private Snowglobe snowglobe;
}
