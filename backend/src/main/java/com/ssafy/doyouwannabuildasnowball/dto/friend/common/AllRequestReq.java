package com.ssafy.doyouwannabuildasnowball.dto.friend.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllRequestReq {
	private Long sendMemberId;
	private Long receiveMemberId;
}
