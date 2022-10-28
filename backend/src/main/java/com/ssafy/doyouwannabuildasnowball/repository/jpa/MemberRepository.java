package com.ssafy.doyouwannabuildasnowball.repository.jpa;

import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByKakaoId(Long kakaoId);
    Optional<Member> findByEmail(String email);
    Boolean existsByNickname(String nickname);

    @Modifying
    // native query
    // @Query(value = "UPDATE Member m SET m.snowglobeId=:snowglobeId WHERE m.memberId=:memberId", nativeQuery = true)
    // JPQL
    @Query("update Member m set m.snowglobe.snowglobeId =:snowglobeId where m.memberId =:memberId")
    void updateSnowglobeIdById(@Param("memberId") Long memberId,@Param("snowglobeId") Long snowglobeId);

}
