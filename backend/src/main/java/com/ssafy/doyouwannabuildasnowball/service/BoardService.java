package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.api.S3Upload;
import com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException;
import com.ssafy.doyouwannabuildasnowball.domain.Board;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.dto.board.BoardDto;
import com.ssafy.doyouwannabuildasnowball.dto.board.request.WriteBoardRequest;
import com.ssafy.doyouwannabuildasnowball.dto.board.response.BoardAllResponse;
import com.ssafy.doyouwannabuildasnowball.dto.board.response.BoardResponse;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.BoardRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import springfox.documentation.spring.web.json.Json;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException.BOARD_NOT_FOUND;
import static com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException.SNOWGLOBE_NOT_FOUND;


@Service
@RequiredArgsConstructor
@Slf4j
public class BoardService {


    private final BoardRepository boardRepository;

    private final SnowglobeRepository snowglobeRepository;
    private final S3Upload s3Upload;

    public BoardAllResponse findAllContentsBySnowglobe(Long snowglobeId) {

        List<Board> boardList = boardRepository.findAllContents(snowglobeId)
                .orElseThrow(() -> new NotFoundException(BOARD_NOT_FOUND));


        List<BoardResponse> boardResponses = new ArrayList<>();
        boardList.forEach(board -> boardResponses.add(BoardResponse.builder()
                        .createdTime(board.getCreatedTime())
                        .modifiedTime(board.getModifiedTime())
                        .boardId(board.getBoardId())
                        .snowglobeId(board.getSnowglobe().getSnowglobeId())
                        .content(board.getContent())
                        .imageUrl(board.getPicture()).build()
        ));
        BoardAllResponse boardAllResponse = new BoardAllResponse(boardResponses);


        log.info("boardList size : " + boardList.size());
        return boardAllResponse;
    }

    public void saveContent(WriteBoardRequest writeBoardRequest) throws NotFoundException {

        Snowglobe snowglobe = snowglobeRepository.findById(writeBoardRequest.getSnowglobeId())
                .orElseThrow(()->new NotFoundException(SNOWGLOBE_NOT_FOUND));

        String imageURL = null;

        // request에 파일이 존재하는 경우
        if(writeBoardRequest.getPicture() != null)
            imageURL = s3Upload.uploadImageToS3(writeBoardRequest.getPicture());

        boardRepository.save(Board.builder()
                        .content(writeBoardRequest.getContent())
                        .picture(imageURL)
                        .snowglobe(snowglobe)
                        .build());
    }


    public void modifyCotnent(BoardDto boardDto) {

        Board board = boardRepository.findById(boardDto.getBoardId())
                .orElseThrow(() -> new NotFoundException(BOARD_NOT_FOUND));
        String imageURL = s3Upload.uploadImageToS3(boardDto.getPicture());
        board.contentUpdate(boardDto.getContent(), imageURL);
        boardRepository.updateBoardContent(board.getContent(), board.getPicture(), board.getBoardId());

    }

    public void removeContent(Long boardId) {

        boardRepository.deleteById(boardId);
    }
}
