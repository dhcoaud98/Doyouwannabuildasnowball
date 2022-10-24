package com.ssafy.doyouwannabuildasnowball.repository.jpa;

import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface SnowglobeRepository extends JpaRepository<Snowglobe, Long> {
    @Query(nativeQuery = true, value = "select * from (" +
            "select s.snowglobeId, s.screenshot from snowglobe s where s.makerId := id and s.makerSaved := true union " +
            "select s.snowglobeId, s.screenshot from snowglobe s where s.receiverId := id and s.receiverSaved := true order by createdTime",
            countQuery = "select * from (" +
                    "select s.snowglobeId, s.screenshot from snowglobe s where a.makerId := id and s.makerSaved := true union " +
                    "select s.snowglobeId, s.screenshot from snowglobe s where a.receiverId := id and s.receiverSaved := true order by createdTime")
    PageImpl<Snowglobe> findAllByMakerIdAndReceiverId(Long id, Pageable pageable);
}
