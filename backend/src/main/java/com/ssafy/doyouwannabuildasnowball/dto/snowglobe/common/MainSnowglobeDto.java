package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MainSnowglobeDto {
    private Long snowglobeId;
    private String decorateId;
    private String screenshot;
    private int music;

}
