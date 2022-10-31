package com.ssafy.doyouwannabuildasnowball.repository.jpa;

import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response.SnowglobeShelfResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SnowglobeRepository extends JpaRepository<Snowglobe, Long> {
    @Query(name = "set_shelf", nativeQuery = true)
    List<SnowglobeShelfResponseDto> findAllByMakerIdAndReceiverId(@Param("id") Long id);
}
