package com.ssafy.doyouwannabuildasnowball.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//import static com.ssafy.doyouwannabuildasnowball.common.exception.BadRequestException.*;
//import static com.ssafy.doyouwannabuildasnowball.common.exception.DuplicateException.*;
import static com.ssafy.doyouwannabuildasnowball.common.exception.ErrorCode.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.doyouwannabuildasnowball.common.exception.CustomException;
import com.ssafy.doyouwannabuildasnowball.domain.Friend;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Request;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendDtoInterface;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendMemberDtoInterface;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendRes;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendResInterface;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendStatusRes;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.FriendRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.RequestRepository;


@Service
@RequiredArgsConstructor
@Slf4j
//@Transactional(readOnly = true)
public class FriendService {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private final FriendRepository friendRepository;
	private final MemberRepository memberRepository;
	private final RequestRepository requestRepository;
	
	// 친구 요청
	public List<FriendRes> request(Long followId, Long followedId) {
		
//		// 방법 1 - isPresent()
//	 	Optional<Member> followMember = memberRepository.findById(followId);
//		Optional<Member> followedMember = memberRepository.findById(followedId);
//		
//		if(followMember.isPresent() && followedMember.isPresent()) {
////			Member follow = memberRepository.findById(followId).get();
////			Member followed = memberRepository.findById(followedId).get();				
//			Friend friend = Friend.create(followMember.get(), followedMember.get());
//			friendRepository.save(friend);
//		}
		
		
		// 방법 2 - orElseThrow()
		Member follow = memberRepository.findById(followId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
//		.orElseThrow(() -> new BadRequestException(MEMBER_BAD_REQUEST));
		Member followed = memberRepository.findById(followedId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
		
		
		// save 하기 전에 해당 친구 데이터 있는지 확인
		Friend friendData = friendRepository.findFriend(followId, followedId);
		
		if(friendData == null) {
			Friend friend = Friend.create(follow, followed);
			friendRepository.save(friend);
			
		} else {
			throw new CustomException(FRIEND_DUPLICATE_RESOURCE);
		}
		
		return getAllFriendInfo(followId);
	}
	
	
	// 친구 요청 승낙
	// return 타입 고민
	// (친구 요청 승낙하면 friend list를 보여주는 게 맞나? 아니면 그 친구 요청 승낙해야 할 그 목록을 보여줘야하나)
	public List<FriendRes> approveRequest(Long friendId, Long memberId) {
		
		Friend friend = friendRepository.findById(friendId).orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));
		friendRepository.save(Friend.approve(friend));

		// 친구 요청 목록 반환
		return getAllFriendInfo(memberId);
		
	}
	
	
	// 친구 유무 
	public FriendStatusRes getFriendStatus(Long myMemberId, Long yourMemberId) {
		FriendStatusRes friendStatusRes = FriendStatusRes.find(friendRepository.getFriendStatus(myMemberId, yourMemberId));
//		friendRepository.getFriendStatus(myMemberId, yourMemberId);
//		System.out.println(">> friendStatusRes : "+friendStatusRes);
		return friendStatusRes;
	}
	
	
	// 친구 관련 정보 리스트  *리팩토링 01
	public List<FriendRes> getAllFriendInfo(Long userId) {
		
		List<FriendDtoInterface> allFriendsList = friendRepository.getAllFriendsInfo(userId);
		
		
		List<Long> memberIdList= new ArrayList<Long>();
		for(FriendDtoInterface friend : allFriendsList) {
			memberIdList.add(friend.getMemberId());
		}
//		System.out.println(">> memberIdList : "+memberIdList.toString());
		
		memberRepository.findAllById(memberIdList);
		// memberRepository.getAllFriendInfo 대신 아래 걸로 찾아와도 될 듯
//		System.out.println(memberRepository.findAllById(memberIdList).toString());
		
		
		
		List<FriendMemberDtoInterface> allFriendMemberList = memberRepository.getAllFriendInfo(memberIdList);
//		System.out.println(">> allFriendsList.size() "+allFriendsList.size()+" // allFriendMemberList.size() "+allFriendMemberList.size());
		
		int cnt = allFriendsList.size();
		List<FriendRes> friendInfoList = new ArrayList<FriendRes>();
		for(int idx=0; idx<cnt; idx++) {
			
			friendInfoList.add(FriendRes.combine(allFriendsList.get(idx), allFriendMemberList.get(idx)));
			
		}
		
		// 정렬 - FriendRes에 사용자 정의 정렬 조건(status 오름차순 정렬 + 닉네임 오름차순 정렬) 작성
		Collections.sort(friendInfoList);
		
		return friendInfoList;
	}
	
	
	// 친구 관련 정보 리스트
	// 받은 친구 요청 목록 + 승낙 안 된 보낸 친구 요청 목록 + 내 친구 목록 (받은 스노우볼 요청 상태)
	public List<FriendRes> getAllFriendInfo01(Long userId) {
		
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
			
			result.add(friendRes);
		}
		
		return result;
	}


	// 내 친구 삭제
	// 받은 친구 요청 삭제, 승낙 안 된 보낸 친구 요청 삭제, 친구 삭제 다 포함
	// 친구 목록 반환
	public List<FriendRes> deleteFriend(Long friendId, Long memberId) {
		
		friendRepository.deleteById(friendId);
		return getAllFriendInfo(memberId);
	}
	

	
	// 친구 검색
	// 친구 목록에서 닉네임에 해당 키워드 포함된 친구들만
	// 닉네임에 해당 키워드 포함된 유저들
	public List<FriendRes> searchFriend(Long userId, String keyword) {
		
		// 내 친구 memberId 리스트
		List<Long> allFriendList = friendRepository.getAllFriendsMemberId(userId);
		allFriendList.add(userId);

		List<FriendMemberDtoInterface> allNotFriendMemberList = memberRepository.getAllNotFriendMemberByNickname(keyword, allFriendList);

		List<FriendRes> result = new ArrayList<FriendRes>();

		// 검색 결과 내 친구 아닌 유저 정보 리스트
		for(FriendMemberDtoInterface notFriendMember : allNotFriendMemberList) {
			FriendRes friendRes = FriendRes.findMember(notFriendMember);
			
			result.add(friendRes);
		}
		
		return result;
	}
	
	// 스노우볼 요청 보내기
	// String 반환
	public String requestSnowglobe(Long askId, Long askedId) {
		String result = "요청에 실패했어요.";
		
		Member ask = memberRepository.findById(askId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
		Member asked = memberRepository.findById(askedId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
		
		
		// save 하기 전에 해당 스노우볼 요청 데이터 있는지 확인
		Request request = requestRepository.findByAskAndAsked(ask, asked);
		
		if(request == null) {
			requestRepository.save(Request.create(ask, asked));
			result = "스노우볼을 요청했어요!";
		} else {
			throw new CustomException(SNOWGLOBE_REQUEST_DUPLICATE_RESOURCE);
		}

		return result;

	}
	
	// 받은 스노우볼 요청 삭제
	// 그 친구에게 받은 모든 요청 삭제
	// 친구 목록 반환
	public List<FriendRes> deleteSnowglobeRequest(Long askId, Long askedId) {
			
		Member ask = memberRepository.findById(askId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
		Member asked = memberRepository.findById(askedId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
		requestRepository.deleteAllByAskAndAsked(ask, asked);
		
		return getAllFriendInfo(askedId);
	}
	
}
