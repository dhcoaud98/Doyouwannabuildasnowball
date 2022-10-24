package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SnowglobeRequestDto {
    private String decorateId;
    private String screenshot;
    private int music;
}
