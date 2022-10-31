package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Snowman;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Tree;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnowglobeDetailResponseDto {
    private Long snowglobeId;
    private Tree tree;
    private Snowman snowman;
}
