package com.ssafy.doyouwannabuildasnowball.domain.collection;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.List;

@Document(collection = "decoration")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Decoration {
    @Id
    private Long id;
    // 스노우볼 커스텀 요소 맞춰서 수정
    private List<Element> deco;

    public void updateDeco(Long id, List<Element> deco) {
        this.id = id;
        this.deco = deco;
    }

    public Decoration ( Long snowglobeId ) {
        this.id = snowglobeId;
        this.deco = null;
    }

}
