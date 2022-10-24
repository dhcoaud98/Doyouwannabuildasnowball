package com.ssafy.doyouwannabuildasnowball.domain.collection;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "decoration")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Decoration {
    @Id
    private Long id;
    // 스노우볼 커스텀 요소 맞춰서 수정
    private String deco;
}
