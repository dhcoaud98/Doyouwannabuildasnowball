package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SnowglobeCollectionResponseDto {
    private Long snowglobeId;
    private String screenshot;
    private String maker;
}
