package com.ssafy.doyouwannabuildasnowball.controller;


import com.ssafy.doyouwannabuildasnowball.common.exception.CustomException;
import com.ssafy.doyouwannabuildasnowball.common.exception.ErrorCode;
import com.ssafy.doyouwannabuildasnowball.dto.board.BoardDto;
import com.ssafy.doyouwannabuildasnowball.dto.board.request.WriteBoardRequest;
import com.ssafy.doyouwannabuildasnowball.dto.board.response.BoardAllResponse;
import com.ssafy.doyouwannabuildasnowball.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/{snowglobeId}/all")
    public ResponseEntity<BoardAllResponse> findAllBoardBySnowglobe(@PathVariable Long snowglobeId) {
        BoardAllResponse allContentsBySnowglobe = boardService.findAllContentsBySnowglobe(snowglobeId);
        log.info("board controller, all Contents : " + allContentsBySnowglobe.getBoardList().size());
        return ResponseEntity.status(HttpStatus.OK).body(allContentsBySnowglobe);
    }


    @PostMapping("/write")
    public ResponseEntity<Void> saveContent(@RequestBody WriteBoardRequest writeBoardRequest) {
        boardService.saveContent(writeBoardRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/modify")
    public ResponseEntity<Void> modifyContent(@RequestBody BoardDto boardDto) {
        boardService.modifyCotnent(boardDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{boardId}/{memberId}/delete")
    public ResponseEntity<Void> removeContent(@PathVariable Long boardId, @PathVariable Long memberId) {
        if(memberId == null) throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        boardService.removeContent(boardId, memberId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }





}
