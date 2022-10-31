package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Snowman;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Tree;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SnowglobeRequestDto {
    private Long makerId;
    private String screenshot;
    private Tree tree;
    private Snowman snowman;
}
