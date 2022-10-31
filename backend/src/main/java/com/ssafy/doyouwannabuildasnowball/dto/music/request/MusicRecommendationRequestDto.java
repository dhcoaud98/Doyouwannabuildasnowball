package com.ssafy.doyouwannabuildasnowball.dto.music.request;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Decoration;
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
public class MusicRecommendationRequestDto {
    private Long snowglobeId;
    private Tree tree;
    private Snowman snowman;
}
