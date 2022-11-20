package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.CustomException;
import com.ssafy.doyouwannabuildasnowball.domain.Board;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.dto.board.BoardDto;
import com.ssafy.doyouwannabuildasnowball.dto.board.request.WriteBoardRequest;
import com.ssafy.doyouwannabuildasnowball.dto.board.response.BoardAllResponse;
import com.ssafy.doyouwannabuildasnowball.dto.board.response.BoardResponse;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.BoardRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.ssafy.doyouwannabuildasnowball.common.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardService {


    private final BoardRepository boardRepository;

    private final SnowglobeRepository snowglobeRepository;
    private final MemberRepository memberRepository;

    public BoardAllResponse findAllContentsBySnowglobe(Long snowglobeId) {

        List<Board> boardList = boardRepository.findAllContents(snowglobeId)
                .orElseThrow(() -> new CustomException(BOARD_NOT_FOUND));


        List<BoardResponse> boardResponses = new ArrayList<>();
        boardList.forEach(board -> boardResponses.add(BoardResponse.builder()
                        .createdTime(board.getCreatedTime())
                        .modifiedTime(board.getModifiedTime())
                        .boardId(board.getBoardId())
                        .snowglobeId(board.getSnowglobe().getSnowglobeId())
                        .writerId(board.getWriter().getMemberId())
                        .content(board.getContent())
                        .imageUrl(board.getPicture()).build()
        ));
        BoardAllResponse boardAllResponse = new BoardAllResponse(boardResponses);


        log.info("boardList size : " + boardList.size());
        return boardAllResponse;
    }

    @Transactional
    public void saveContent(WriteBoardRequest writeBoardRequest){

        Snowglobe snowglobe = snowglobeRepository.findById(writeBoardRequest.getSnowglobeId())
                .orElseThrow(()->new CustomException(SNOWGLOBE_NOT_FOUND));

        String imageURL = writeBoardRequest.getPicture();

        boardRepository.save(Board.builder()
                .content(writeBoardRequest.getContent())
                .picture(imageURL)
                .snowglobe(snowglobe)
                .writer(memberRepository.findById(writeBoardRequest.getWriterId()).orElse(null))
                .build());
    }


    public void modifyCotnent(BoardDto boardDto) {

        Board board = boardRepository.findById(boardDto.getBoardId())
                .orElseThrow(() -> new CustomException(BOARD_NOT_FOUND));
        if(board.getWriter().getMemberId() != boardDto.getWriterId()) {
            throw new CustomException(UNMATCHED_MEMBER);
        }
        String imageURL = boardDto.getPicture();
        board.contentUpdate(boardDto.getContent(), imageURL);
        boardRepository.updateBoardContent(board.getContent(), board.getPicture(), board.getBoardId());

    }

    public void removeContent(Long boardId, Long memberId) {
        log.info("board id : " + boardId);
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new CustomException(BOARD_NOT_FOUND));
        Long boardOwnerId = board.getSnowglobe().getReceiver().getMemberId();
        if(!Objects.equals(memberId, boardOwnerId) || !Objects.equals(memberId, board.getWriter().getMemberId()))
            throw new CustomException(MEMBER_NOT_FOUND);
        boardRepository.deleteById(boardId);
    }
}
