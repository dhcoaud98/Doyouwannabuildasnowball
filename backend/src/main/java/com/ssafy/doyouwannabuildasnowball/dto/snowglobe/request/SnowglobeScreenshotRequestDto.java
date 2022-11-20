package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SnowglobeScreenshotRequestDto {
    private Long sid;
    private String url;
}
