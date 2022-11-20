package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Element;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnowglobeDetailResponseDto {
    private Long receiverId;
    private Long snowglobeId;
    private Long musicId;
    private List<Element> deco;
}
