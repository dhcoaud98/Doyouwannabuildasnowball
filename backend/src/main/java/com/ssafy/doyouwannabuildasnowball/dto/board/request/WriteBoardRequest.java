package com.ssafy.doyouwannabuildasnowball.dto.board.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WriteBoardRequest {

    private Long snowglobeId;
    private String content;
    private String picture;





}
