package com.ssafy.doyouwannabuildasnowball.dto.board.response;

import com.ssafy.doyouwannabuildasnowball.domain.Board;
import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardAllResponse {

    List<BoardResponse> boardList;

    public BoardAllResponse(List<BoardResponse> boardList) {
        this.boardList = boardList;
    }
}
