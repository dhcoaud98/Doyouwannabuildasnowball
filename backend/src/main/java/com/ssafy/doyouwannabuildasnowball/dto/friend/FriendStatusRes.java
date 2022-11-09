package com.ssafy.doyouwannabuildasnowball.dto.friend;

import java.util.List;

import com.ssafy.doyouwannabuildasnowball.domain.Friend;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FriendStatusRes {
//	private Long memberId;
    private Long friendId;
    private int status;

    public static FriendStatusRes find(FriendDtoInterface friendDtoInterface) {
    	FriendStatusRes friendStatusRes = new FriendStatusRes();
    	
    	if(friendDtoInterface != null) {
//    	friendStatusRes.memberId = friendDtoInterface.getMemberId();
    		friendStatusRes.friendId = friendDtoInterface.getFriendId();
    		friendStatusRes.status = friendDtoInterface.getStatus();
    	}

    	return friendStatusRes;
    }
}
