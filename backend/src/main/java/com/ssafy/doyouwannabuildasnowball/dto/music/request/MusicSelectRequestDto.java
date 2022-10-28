package com.ssafy.doyouwannabuildasnowball.dto.music.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MusicSelectRequestDto {
    private Long musicId;
}
