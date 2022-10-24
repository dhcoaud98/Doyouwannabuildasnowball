package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnowglobeDetailResponseDto {
    private String decorationId;
    private String deco;
}
