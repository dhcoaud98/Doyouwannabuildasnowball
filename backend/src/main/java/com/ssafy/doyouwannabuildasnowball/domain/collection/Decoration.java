package com.ssafy.doyouwannabuildasnowball.domain.collection;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "decoration")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Decoration {
    @Id
    private Long id;
    // 스노우볼 커스텀 요소 맞춰서 수정
    private Tree tree;
    private Snowman snowman;

    public void updateDeco(Long id, Tree tree, Snowman snowman) {
        this.id = id;
        this.tree = tree;
        this.snowman = snowman;
    }
}
