package com.ssafy.doyouwannabuildasnowball.dto.member;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private Long id;

    private Long kakaoId;

    private String name;

    private String phone;


    private String email;


    private String profileImageUrl;

}
