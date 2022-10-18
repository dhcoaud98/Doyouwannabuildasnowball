package com.ssafy.doyouwannabuildasnowball.domain.collection;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "decoration")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Decoration {
    @Id
    private String id;
    // 스노우볼 커스텀 요소 맞춰서 수정
}
