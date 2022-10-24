package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Decoration;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnowglobeUpdateRequestDto {
    private String decoration;
    private String screenshot;
}
