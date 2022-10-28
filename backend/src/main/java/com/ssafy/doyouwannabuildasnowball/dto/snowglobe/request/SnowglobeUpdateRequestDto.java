package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Snowman;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Tree;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnowglobeUpdateRequestDto {
    private Tree tree;
    private Snowman snowman;
}
