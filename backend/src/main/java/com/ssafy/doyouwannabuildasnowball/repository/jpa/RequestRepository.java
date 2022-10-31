package com.ssafy.doyouwannabuildasnowball.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Request;

@Transactional
public interface RequestRepository extends JpaRepository<Request, Long> {

	// 받은 스노우볼 요청 삭제
	// 스노우볼 요청자와 요청 받은 자가 넘어온 값이랑 같으면 해당 데이터 다 삭제
	// requestId로 데이터 삭제가 아니라 request테이블 데이터 중 askId, askedId가 입력된 데이터와 동일한 데이터 모두 삭제
	// 방법 1 - jpa query creation from method names
	void deleteAllByAskAndAsked(Member ask, Member asked);

	// 방법 2 - nativeQuery
//	@Modifying
//	@Query(value="DELETE FROM request WHERE ask_id=:askId AND asked_id=:askedId", nativeQuery = true)
//	void deleteSnowglobeRequest(@Param("askId") Long askId, @Param("askedId") Long askedId);

}
