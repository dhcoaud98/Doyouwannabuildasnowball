package com.ssafy.doyouwannabuildasnowball.dto.member.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequest {

    @ApiModelProperty(notes = "카카오 아이디")
    private Long kakaoId;
    @ApiModelProperty(notes = "닉네임")
    private String nickname;
//    @ApiModelProperty(notes = "전화번호")
//    private String tel;
//    @ApiModelProperty(notes = "이메일")
//    private String email;
}