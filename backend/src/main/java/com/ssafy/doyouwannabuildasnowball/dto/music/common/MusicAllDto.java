package com.ssafy.doyouwannabuildasnowball.dto.music.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MusicAllDto {
    private Long musicId;
    private String url;
    private String title;
}
