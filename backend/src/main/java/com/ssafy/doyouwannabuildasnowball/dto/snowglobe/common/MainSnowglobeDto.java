package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.common;

import com.ssafy.doyouwannabuildasnowball.domain.Music;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MainSnowglobeDto {
    private Long snowglobeId;
    private String screenshot;
    private Long musicId;

}
