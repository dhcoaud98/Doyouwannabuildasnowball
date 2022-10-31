package com.ssafy.doyouwannabuildasnowball.controller;


import com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException;
import com.ssafy.doyouwannabuildasnowball.dto.board.BoardDto;
import com.ssafy.doyouwannabuildasnowball.dto.board.request.WriteBoardRequest;
import com.ssafy.doyouwannabuildasnowball.dto.board.response.BoardAllResponse;
import com.ssafy.doyouwannabuildasnowball.service.BoardService;
import io.swagger.annotations.ApiParam;
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

    @GetMapping("/all/{snowglobeId}")
    public ResponseEntity<BoardAllResponse> findAllBoardBySnowglobe(@PathVariable Long snowglobeId) {
        return ResponseEntity.status(HttpStatus.OK).body(boardService.findAllContentsBySnowglobe(snowglobeId));
    }


    @PostMapping("/write")
    public ResponseEntity<Void> saveContent(@RequestBody WriteBoardRequest writeBoardRequest) {
        try {
            boardService.saveContent(writeBoardRequest);
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/modify")
    public void modifyContent(@RequestBody BoardDto boardDto) {
        try {
            boardService.modifyCotnent(boardDto);
        } catch (NotFoundException ne) {
            ne.printStackTrace();
        }
    }

    @DeleteMapping("/{boardId}/delete")
    public ResponseEntity<Void> removeContent(Long boardId) {
        boardService.removeContent(boardId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }





}
