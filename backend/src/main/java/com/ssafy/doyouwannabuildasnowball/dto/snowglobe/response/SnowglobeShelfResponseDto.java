package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnowglobeShelfResponseDto {
    private Long snowglobeId;
    private String screenshot;
    private Long makerId;
}
