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
public class FriendRes {
	private Long memberId;
	private String profileImageUrl;
	private String nickname;
    private Long snowglobeId;
    private Long friendId;
    private int status;
    private int snowglobeRequestCnt;
    
    
//    public static FriendRes convert(Friend friend) {
//    	
//    	FriendRes friendInfo = new FriendRes();
////    	friendInfo.memberId = friend.get
////    	friendInfo.profileImageUrl = 
////    	friendInfo.nickname
////    	friendInfo.snowglobeId
////    	friendInfo.friendId
//    	
//    	// status, snowglobeRequestCnt는 어느 목록 가져오느냐에 다라서 달라짐
//    	friendInfo.status
//    	
//    	friend.follow = follow;
//    	friend.followed = followed;
//    	
//        return friendInfo;
//    }
    
    
    public static FriendRes find(FriendResInterface friendResInterface) {
    	FriendRes friendRes = new FriendRes();
    	friendRes.friendId = friendResInterface.getFriendId();
    	friendRes.memberId = friendResInterface.getMemberId();
    	friendRes.nickname = friendResInterface.getNickname();
    	friendRes.profileImageUrl = friendResInterface.getProfileImageUrl();
    	friendRes.snowglobeId = friendResInterface.getSnowglobeId();
    	
    	try {
    		friendRes.snowglobeRequestCnt = friendResInterface.getSnowglobeRequestCnt();
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(">> FriendRes find Exception: "+e);
			friendRes.snowglobeRequestCnt = 0;
		}
    	
    	return friendRes;
    }
    
    public static FriendRes mark(FriendRes friendRes, int status) {
    	
    	friendRes.status = status;
    	
    	return friendRes;
    }
   
    
}
