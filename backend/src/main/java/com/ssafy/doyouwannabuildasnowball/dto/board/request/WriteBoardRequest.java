package com.ssafy.doyouwannabuildasnowball.dto.board.request;

import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WriteBoardRequest {

    private Long snowglobeId;
    private Long writerId;
    private String content;
    private String picture;
}
