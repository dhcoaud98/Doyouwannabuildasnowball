package com.ssafy.doyouwannabuildasnowball.dto.snowglobe.common;

import com.ssafy.doyouwannabuildasnowball.domain.Music;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Snowman;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Tree;
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
    private Long musicId;
    private Tree tree;
    private Snowman snowman;

}
