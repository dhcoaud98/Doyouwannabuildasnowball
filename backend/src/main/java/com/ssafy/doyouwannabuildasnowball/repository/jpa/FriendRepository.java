package com.ssafy.doyouwannabuildasnowball.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.doyouwannabuildasnowball.domain.Friend;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendDtoInterface;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendRes;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendResInterface;


public interface FriendRepository extends JpaRepository<Friend, Long> {

	// 방법 1, 방법 2 보류
	
	// 받은 친구 요청 목록
	// order by nickname 되나? -> 안 됨  Friend에서 nickname 찾을 수 없다고 나옴
//	List<Friend> findAllByFollowedAndAcceptanceOrderByNickname(Member followed, boolean acceptance);
	// 방법 1 - jpa query creation from method names
	// 이렇게 하니까 너무 많은 정보를 가지고 오고 그거를 Res에 일일이 찾아서 담아줘야 함..
	// 그리고 Friend를 FriendRes로 담는 과정에서 메서드 하나만 만들어서 받은 친구 요청 목록과 승낙 안 된 보낸 친구 요청 목록을 FriendRes로 변환하는데 사용하려고 했는데 
	// 두 상황에서 Res의 Member 관련 변수랑 매핑되는 게 하나는 follow, 다른 하나는 followed로 달라서 처리가 번거로워짐... 
	List<Friend> findAllByFollowedAndAcceptance(Member followed, boolean acceptance);

	// 방법 2 - JPQL
//	@Query("SELECT f.friendId, f.follow.memberId, f.follow.profileImageUrl, f.follow.nickname, f.follow.snowglobe.snowglobeId FROM Friend f WHERE f.followed.followedId = :followedId AND f.acceptance = false")
//	public List<FriendRes> getAllRequests(@Param("followedId") Long followedId);
	
	// 방법 3 - nativeQuery
	@Query(value="SELECT friend_id friendId, member_id memberId, nickname, profile_image_url profileImageUrl, snowglobe_id snowglobeId " + 
			"FROM (SELECT friend_id, follow_id FROM friend WHERE followed_id = :followedId AND acceptance = false) f JOIN member m ON f.follow_id = m.member_id " + 
			"ORDER BY nickname", nativeQuery = true)
	List<FriendResInterface> getAllRequests(@Param("followedId") Long followedId);
	
	
	// 승낙 안 된 보낸 친구 요청 목록
	// 방법 1 - jpa query creation from method names
	// 서비스단에서 가나다순 정렬
	List<Friend> findAllByFollowAndAcceptance(Member follow, boolean acceptance);
	
	// 방법 2 - JPQL
//	@Query("SELECT m FROM friend f WHERE f.follow.followId = :followedId AND acceptance = false")
//	public List<FriendRes> getAllSendRequests(@Param("followId") Long followedId);
	
	// 방법 3 - nativeQuery
	@Query(value="SELECT friend_id friendId, member_id memberId, nickname, profile_image_url profileImageUrl, snowglobe_id snowglobeId " + 
			"FROM (SELECT friend_id, followed_id FROM friend WHERE follow_id = :followId AND acceptance = false) f JOIN member m ON f.followed_id = m.member_id " + 
			"ORDER BY nickname", nativeQuery = true)
	List<FriendResInterface> getAllSendRequests(@Param("followId") Long followId);
	
	
	// 내 친구 목록
	@Query(value="SELECT friendId, memberId, nickname, profileImageUrl, snowglobeId, snowglobeRequestCnt " + 
			"FROM (SELECT friend_id friendId, memberId, nickname, profile_image_url profileImageUrl, snowglobe_id snowglobeId " + 
			"FROM (SELECT friend_id, follow_id memberId FROM friend WHERE followed_id = :userId AND acceptance = true UNION " + 
			"SELECT friend_id, followed_id memberId FROM friend WHERE follow_id = :userId AND acceptance = true) f JOIN member m ON f.memberId = m.member_id) fnm LEFT OUTER JOIN " + 
			"(SELECT ask_id, count(*) snowglobeRequestCnt FROM request WHERE asked_id = :userId GROUP BY ask_id) r ON fnm.memberId = r.ask_id " + 
			"ORDER BY nickname", nativeQuery = true)
	List<FriendResInterface> getAllFriends(@Param("userId") Long userId);
	
	
	
	
	// 친구 목록 *리팩토링 01
	// 나와 관련 있는 유저 memberId, friendId, status 가져오기
	@Query(value="SELECT member_id memberId, friend_id friendId, status, IFNULL(snowgloberequestCnt, 0) snowgloberequestCnt " + 
			"FROM (SELECT IF(follow_id = :userId, followed_id, follow_id) AS member_id, friend_id, " + 
			" CASE " + 
			"  WHEN acceptance = false AND followed_id = :userId " + 
			"  THEN 1 " + 
			"  WHEN acceptance = false AND follow_id = :userId " + 
			"  THEN 2 " + 
			"  WHEN acceptance = true AND (follow_id = :userId OR followed_id = :userId) " + 
			"  THEN 3 " + 
			" END AS status " + 
			"FROM friend WHERE follow_id = :userId OR followed_id = :userId) f " + 
			"LEFT OUTER JOIN (SELECT ask_id, count(*) snowgloberequestCnt " + 
			"FROM request " + 
			"WHERE asked_id = :userId " + 
			"GROUP BY ask_id) r ON f.member_id = r.ask_id " + 
			"ORDER BY memberId", nativeQuery = true)
	List<FriendDtoInterface> getAllFriendsInfo(@Param("userId") Long userId);
	
	
	
	// 유저 검색
	// 검색 결과 내 친구 (친구 요청 하거나 받은 목록도 같이 보여줘야 함..)
//	@Query(value="SELECT friendId, memberId, nickname, profileImageUrl, snowglobeId, snowglobeRequestCnt " + 
//			"FROM (SELECT friend_id friendId, memberId, nickname, profile_image_url profileImageUrl, snowglobe_id snowglobeId " + 
//			"FROM (SELECT friend_id, follow_id memberId FROM friend WHERE followed_id = :userId AND acceptance = true UNION " + 
//			"SELECT friend_id, followed_id memberId FROM friend WHERE follow_id = :userId AND acceptance = true) f JOIN member m ON f.memberId = m.member_id) fnm LEFT OUTER JOIN " + 
//			"(SELECT ask_id, count(*) snowglobeRequestCnt FROM request WHERE asked_id = :userId GROUP BY ask_id) r ON fnm.memberId = r.ask_id " + 
//			"WHERE nickname like "%:keyword%" ORDER BY nickname", nativeQuery = true)
//	public List<FriendResInterface> getAllFriends(@Param("userId") Long userId, @Param("keyword") String keyword);
	
	// 검색 결과 내 친구 아닌 유저들
//	public List<FriendResInterface> getAllUsersByKeyword(@Param("userId") Long userId, @Param("keyword") String keyword);
	
	
	// 나와 친구 관계 있는 유저들의 memberId 찾기
	@Query(value="SELECT IF(follow_id = :userId, followed_id, follow_id) AS member_id FROM friend WHERE follow_id = :userId OR followed_id = :userId", nativeQuery = true)
	List<Long> getAllFriendsMemberId(@Param("userId") Long userId);
	
	
	// 친구 유무  :yourMemberId memberId, 
	@Query(value = "SELECT friend_id friendId, IF(acceptance = true, 3, IF(followed_id = :myMemberId, 1, 2)) AS status FROM friend " + 
			"WHERE (follow_id = :myMemberId AND followed_id = :yourMemberId) OR (follow_id = :yourMemberId AND followed_id = :myMemberId);", nativeQuery = true)
	FriendDtoInterface getFriendStatus(@Param("myMemberId") Long myMemberId, @Param("yourMemberId") Long yourMemberId);
	
	
}
