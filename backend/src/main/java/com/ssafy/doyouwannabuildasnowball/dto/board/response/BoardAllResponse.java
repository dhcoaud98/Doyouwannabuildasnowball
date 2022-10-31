package com.ssafy.doyouwannabuildasnowball.dto.board.response;

import com.ssafy.doyouwannabuildasnowball.domain.Board;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardAllResponse {

    List<Board> BoardList;

    public BoardAllResponse(List<Board> boardList) {
        this.BoardList = boardList;
    }
}
