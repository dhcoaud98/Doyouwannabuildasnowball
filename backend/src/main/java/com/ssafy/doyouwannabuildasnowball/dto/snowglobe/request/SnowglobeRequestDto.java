package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Element;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SnowglobeRequestDto {
    private Long makerId;
    private String screenshot;
    private List<Element> deco;
}
