package com.ssafy.doyouwannabuildasnowball.repository.jpa;

import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

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


}
