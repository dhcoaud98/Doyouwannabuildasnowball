package com.ssafy.doyouwannabuildasnowball.service;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.doyouwannabuildasnowball.domain.Friend;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Request;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendRes;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendResInterface;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.FriendRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.RequestRepository;


@Service
@RequiredArgsConstructor
//@Transactional(readOnly = true)
public class FriendService {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private final FriendRepository friendRepository;
	private final MemberRepository memberRepository;
	private final RequestRepository requestRepository;
	
	// 친구 요청
	public List<FriendRes> request(Long followId, Long followedId) {
		
		String result = SUCCESS;
		
		try {
//			Member follow = Member.join(followId);
//			Member followed = Member.join(followedId);
			// 들어온 식별자(id)들이 db에 들어있는 게 맞는지 체크할 겸 아래 코드로 하는 게 나을 듯
			Member follow = memberRepository.findById(followId).get();
			Member followed = memberRepository.findById(followedId).get();
			Friend friend = Friend.create(follow, followed);
//			System.out.println(friend.getFollow());
			friendRepository.save(friend);

			
		} catch (Exception e) {
			System.out.println(">> [friend] request Exception : "+e);
			result = FAIL;
			
		}
		
		return getAllFriendInfo(followId);
		
	}
	
	
	// 친구 요청 승낙
	// return 타입 고민
	// (친구 요청 승낙하면 friend list를 보여주는 게 맞나? 아니면 그 친구 요청 승낙해야 할 그 목록을 보여줘야하나)
	public List<FriendRes> approveRequest(Long friendId, Long memberId) {
		
		try {
			Friend friend = friendRepository.findById(friendId).get();
			friendRepository.save(Friend.approve(friend));
			

		} catch (Exception e) {
			System.out.println(">> [friend] approveRequest Exception : "+e);
			
		}
		// 친구 요청 목록 반환
		return getAllFriendInfo(memberId);
		
	}
	
	
	// 친구 관련 정보 리스트
	// 받은 친구 요청 목록 + 승낙 안 된 보낸 친구 요청 목록 + 내 친구 목록 (받은 스노우볼 요청 상태)
	public List<FriendRes> getAllFriendInfo(Long userId) {
		
		List<FriendRes> friendInfoList = new ArrayList<FriendRes>();
		friendInfoList.addAll(getAllRequests(userId));
//		System.out.println(">> getAllRequests : "+friendInfoList);
		friendInfoList.addAll(getAllSendRequests(userId));
//		System.out.println(">> getAllSendRequests : "+friendInfoList);
		friendInfoList.addAll(getAllFriends(userId));
//		System.out.println(">> getAllFriends : "+friendInfoList);
		
		return friendInfoList;
	}
	
	
	// 각 목록들 가나다순
	// 받은 친구 요청 목록
	public List<FriendRes> getAllRequests(Long followedId) {
//		Member followed = memberRepository.findById(followedId).get();
//		System.out.println(">> folowed : "+followed);
//		List<Friend> result = friendRepository.findAllByFollowedAndAcceptance(followed, false);
//		System.out.println(">> result : "+result);
//		System.out.println(result.get(0).getFollowed()+" // "+result.get(0).getFriendId());
		
		List<FriendResInterface> requestsList = friendRepository.getAllRequests(followedId);
		List<FriendRes> result = new ArrayList<FriendRes>();
		
		for(FriendResInterface request : requestsList) {
			FriendRes friendRes = FriendRes.find(request);
			// 프론트에서 구분할 수 있도록 어떤 상태인지 숫자로 표시하기
			friendRes = FriendRes.mark(friendRes, 1);
			
			result.add(friendRes);
		}
		
		return result;
	}
	
	// 승낙 안 된 보낸 친구 요청 목록
	public List<FriendRes> getAllSendRequests(Long followId) {
		
		List<FriendResInterface> sendRequestsList = friendRepository.getAllSendRequests(followId);
		List<FriendRes> result = new ArrayList<FriendRes>();
		
		for(FriendResInterface sendRequest : sendRequestsList) {
			FriendRes friendRes = FriendRes.find(sendRequest);
			// 프론트에서 구분할 수 있도록 어떤 상태인지 숫자로 표시하기
			friendRes = FriendRes.mark(friendRes, 2);
			
			result.add(friendRes);
		}
		
		return result;
	}
	
	// 내 친구 목록
	// 받은 스노우볼 요청 상태도 같이 보여주기
	public List<FriendRes> getAllFriends(Long userId) {
		
		List<FriendResInterface> sendRequestsList = friendRepository.getAllFriends(userId);
		List<FriendRes> result = new ArrayList<FriendRes>();
		
		for(FriendResInterface sendRequest : sendRequestsList) {
			FriendRes friendRes = FriendRes.find(sendRequest);
			// 프론트에서 구분할 수 있도록 어떤 상태인지 숫자로 표시하기
			friendRes = FriendRes.mark(friendRes, 3);
			
			System.out.println(friendRes);
			
			result.add(friendRes);
		}
		
		return result;
	}


	// 내 친구 삭제
	// 받은 친구 요청 삭제, 승낙 안 된 보낸 친구 요청 삭제, 친구 삭제 다 포함
	// 친구 목록 반환
	public List<FriendRes> deleteFriend(Long friendId, Long memberId) {
		
		String result = SUCCESS;
		
		try {
			
			friendRepository.deleteById(friendId);

			
		} catch (Exception e) {
			System.out.println(">> [friend] deleteFriend Exception : "+e);
			result = FAIL;
		}
		return getAllFriendInfo(memberId);
	}
	

	
	// 친구 검색
	// 친구 목록에서 닉네임에 해당 키워드 포함된 친구들만
	// 닉네임에 해당 키워드 포함된 유저들
	public List<FriendRes> searchFriend(String keyword) {
		
		// 검색 결과 내 친구
		
		
		// 검색 결과 내 친구 아닌 유저
		
		
		return null;
	}
	
	
	// 스노우볼 요청 보내기
	// String 반환 (목록 반환할 필요는 없어보이는데.. 어떻게 하는 게 좋으려나)
	// 스노우볼 요청도 친구처럼 하나만 보낼 수 있게 해야하나...?
	public String requestSnowglobe(Long askId, Long askedId) {
		String result = SUCCESS;
		
		try {
			// 들어온 식별자(id)들이 db에 들어있는 게 맞는지 체크할 겸 이 코드로 하는 게 나을 듯
			Member ask = memberRepository.findById(askId).get();
			Member asked = memberRepository.findById(askedId).get();
			requestRepository.save(Request.create(ask, asked));
			
		} catch (Exception e) {
			System.out.println(">> [friend] requestSnowglobe Exception : "+e);
			result = FAIL;
		}
		
		return result;
	}
	
	// 받은 스노우볼 요청 삭제
	// 그 친구에게 받은 모든 요청 삭제
	// 친구 목록 반환
	public List<FriendRes> deleteSnowglobeRequest(Long askId, Long askedId) {
			
		try {
			// 들어온 식별자(id)들이 db에 들어있는 게 맞는지 체크할 겸 이 코드로 하는 게 나을 듯
			// 방법 1
			Member ask = memberRepository.findById(askId).get();
			Member asked = memberRepository.findById(askedId).get();
			requestRepository.deleteAllByAskAndAsked(ask, asked);
			
			// 방법 2
//			requestRepository.deleteSnowglobeRequest(askId, askedId);
			
		} catch (Exception e) {
			System.out.println(">> [friend] deleteSnowglobeRequest Exception : "+e);

		}
		
		return getAllFriendInfo(askedId);
	}
	
}
