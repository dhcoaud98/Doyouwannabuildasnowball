package com.ssafy.doyouwannabuildasnowball.dto.music.request;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Element;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MusicRecommendationRequestDto {
    private Long snowglobeId;
    private List<Element> deco;
}
