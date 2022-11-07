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

    
//    public static FriendStatusRes find(FriendResInterface friendResInterface) {
//    	FriendStatusRes friendStatusRes = new FriendStatusRes();
//    	friendRes.friendId = friendResInterface.getFriendId();
//    	friendRes.memberId = friendResInterface.getMemberId();
//    	friendRes.nickname = friendResInterface.getNickname();
//    	friendRes.profileImageUrl = friendResInterface.getProfileImageUrl();
//    	friendRes.snowglobeId = friendResInterface.getSnowglobeId();
//    	
//    	try {
//    		friendRes.snowglobeRequestCnt = friendResInterface.getSnowglobeRequestCnt();
//		} catch (Exception e) {
//			// TODO: handle exception
//			System.out.println(">> FriendRes find Exception: "+e);
//			friendRes.snowglobeRequestCnt = 0;
//		}
//    	
//    	return friendRes;
//    }
    
   
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
