package com.ssafy.doyouwannabuildasnowball.dto.board.response;

import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
public class BoardResponse {


    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;
    private Long boardId;
    private Long snowglobeId;
    private String content;
    private String imageUrl;

    @Builder
    public BoardResponse(LocalDateTime createdTime, LocalDateTime modifiedTime, Long boardId, Long snowglobeId, String content, String imageUrl) {
        this.createdTime = createdTime;
        this.modifiedTime = modifiedTime;
        this.boardId = boardId;
        this.snowglobeId = snowglobeId;
        this.content = content;
        this.imageUrl = imageUrl;
    }

}
