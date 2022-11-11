package com.ssafy.doyouwannabuildasnowball.dto.board;


import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {

    private Long boardId;
    private Long snowglobeId;
    private String content;
    private String picture;
//    private MultipartFile picture;

}
