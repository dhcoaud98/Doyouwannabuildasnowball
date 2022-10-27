package com.ssafy.doyouwannabuildasnowball.dto.board;


import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {

    private Long boardId;
    private Snowglobe snowglobe;
    private String content;
    private String picture;
}
