package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException;
import com.ssafy.doyouwannabuildasnowball.domain.Board;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.dto.board.BoardDto;
import com.ssafy.doyouwannabuildasnowball.dto.board.request.WriteBoardRequest;
import com.ssafy.doyouwannabuildasnowball.dto.board.response.BoardAllResponse;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.BoardRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import springfox.documentation.spring.web.json.Json;

import java.util.List;
import java.util.Optional;

import static com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException.BOARD_NOT_FOUND;


@Service
@RequiredArgsConstructor
public class BoardService {


    private final BoardRepository boardRepository;

    private final SnowglobeRepository snowglobeRepository;
    public BoardAllResponse findAllBoardBySnowglobe(Long snowglobeId) {
        List<Board> boardList = boardRepository.findAllBySnowglobeId(snowglobeId);
        return new BoardAllResponse(boardList);

    }

    public void saveContent(WriteBoardRequest writeBoardRequest) throws Exception {

        Optional<Snowglobe> snowglobeOptional = snowglobeRepository.findById(writeBoardRequest.getSnowglobeId());
        boardRepository.save(Board.builder()
                        .content(writeBoardRequest.getContent())
                        .picture(writeBoardRequest.getPicture())
                        .snowglobe(snowglobeOptional.orElseThrow(() -> new Exception("snow globe is not present")))
                        .build());

    }


    public void modifyCotnent(BoardDto boardDto) {

        Optional<Board> boardOptional = boardRepository.findById(boardDto.getBoardId());
        Board board;
        if(boardOptional.isPresent()) {
            board = boardOptional.get();
            board.contentUpdate(boardDto.getContent(), boardDto.getPicture());
            boardRepository.updateBoardContent(boardDto.getContent(), board.getPicture(), boardDto.getBoardId());

        } else throw new NotFoundException(BOARD_NOT_FOUND);
    }
}
