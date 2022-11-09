package com.ssafy.doyouwannabuildasnowball.dto.friend;

import java.util.Comparator;
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
public class FriendRes implements Comparable<FriendRes>{
	private Long memberId;
	private String profileImageUrl;
	private String nickname;
    private Long snowglobeId;
    private Long friendId;
    private int status;
    private int snowglobeRequestCnt;
    
    
    
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
   
    public static FriendRes findMember(FriendMemberDtoInterface friendMemberResInterface) {
    	FriendRes friendRes = new FriendRes();
    	friendRes.memberId = friendMemberResInterface.getMemberId();
    	friendRes.nickname = friendMemberResInterface.getNickname();
    	friendRes.profileImageUrl = friendMemberResInterface.getProfileImageUrl();
    	friendRes.snowglobeId = friendMemberResInterface.getSnowglobeId();
    	
    	return friendRes;
    }
    
    
    
    // 친구 목록 *리팩토링 01 
    public static FriendRes combine(FriendDtoInterface friendDtoInterface, FriendMemberDtoInterface friendMemberDtoInterface) {
    	FriendRes friendRes = new FriendRes();
    	
    	// FriendDtoInterface
    	friendRes.memberId = friendDtoInterface.getMemberId();
    	friendRes.friendId = friendDtoInterface.getFriendId();
    	friendRes.status = friendDtoInterface.getStatus();
    	friendRes.snowglobeRequestCnt = friendDtoInterface.getSnowglobeRequestCnt();
    	
    	// FriendMemberDtoInterface
    	friendRes.nickname = friendMemberDtoInterface.getNickname();
    	friendRes.profileImageUrl = friendMemberDtoInterface.getProfileImageUrl();
    	friendRes.snowglobeId = friendMemberDtoInterface.getSnowglobeId();
    	
    	return friendRes;
    }

    
    // 친구 목록 *리팩토링01 사용 시 status순으로 정렬, status 같을 경우 가나다순으로 정렬해주기 위해
	@Override
	public int compareTo(FriendRes friendRes) {
		// TODO Auto-generated method stub
		// status 기준 오름차순
		if(friendRes.status < this.status) {
			return 1;
		} else if(friendRes.status > this.status) {
			return -1;
		} else { // status가 같으면
			// nickname순으로 오름차순
			return nickname.compareTo(friendRes.nickname);	
			// nickname순으로 내림차순
//			return friendRes.nickname.compareTo(nickname);	
		}
	}


    
    
}
