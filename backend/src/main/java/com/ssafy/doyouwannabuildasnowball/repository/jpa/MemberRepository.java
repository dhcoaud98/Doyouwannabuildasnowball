package com.ssafy.doyouwannabuildasnowball.repository.jpa;

import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.dto.friend.FriendMemberDtoInterface;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByKakaoId(Long kakaoId);
    Optional<Member> findByEmail(String email);
    Boolean existsByNickname(String nickname);

    @Modifying
    @Query("update Member m set m.snowglobe.snowglobeId =:snowglobeId where m.memberId =:memberId")
        // native query
        // @Query(value = "UPDATE Member m SET m.snowglobeId=:snowglobeId WHERE m.memberId=:memberId", nativeQuery = true)
        // JPQL
    void updateSnowglobeIdById(@Param("memberId") Long memberId,@Param("snowglobeId") Long snowglobeId);

    @Modifying
    @Query("update Member m set m.nickname =:nickname where m.memberId =:memberId")
    void updateMemberNickname(@Param("memberId") Long memberId, @Param("nickname") String nickname);


    @Transactional
    @Modifying
    @Query("update Member m set m.refreshToken =:refreshToken where m.memberId =:memberId")
    void updateRefreshToken(@Param("memberId") Long memberId, @Param("refreshToken") String refreshToken);


    // 유저 검색 시 사용 
    // 키워드 포함된 해당 memberId 갖지 않은 유저 리스트 
    @Query(value="SELECT member_id memberId, profile_image_url profileImageUrl, nickname, snowglobe_id snowglobeId " + 
    		"FROM member " + 
    		"WHERE nickname like %:keyword% " + 
    		"AND member_id NOT IN (:memberIdList) " + 
    		"ORDER BY nickname", nativeQuery = true)
    List<FriendMemberDtoInterface> getAllNotFriendMemberByNickname(@Param("keyword") String keyword, @Param("memberIdList") List<Long> memberIdList);
    
    
    // 친구 목록 
    // 해당 memberId 갖는 유저의 정보 가져오기
    @Query(value="SELECT member_id memberId, profile_image_url profileImageUrl, nickname, snowglobe_id snowglobeId " + 
    		"FROM member " + 
    		"WHERE member_id IN (:memberIdList) " + 
    		"ORDER BY memberId", nativeQuery = true)
    List<FriendMemberDtoInterface> getAllFriendInfo(@Param("memberIdList") List<Long> memberIdList);


    @Transactional
    @Modifying
    @Query("update Member m set m.refreshToken = null where m.memberId =:memberId")
    void deleteRefreshTokenByMemberId(@Param("memberId") Long memberId);
}
