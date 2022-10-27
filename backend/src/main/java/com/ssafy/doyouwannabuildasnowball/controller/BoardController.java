package com.ssafy.doyouwannabuildasnowball.controller;


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
//        return ResponseEntity.status(HttpStatus.OK).body(boardService.findAllBoardBySnowglobe(snowglobeId));
        return null;
    }


    @PostMapping("/write")
    public void saveContent(@RequestBody WriteBoardRequest writeBoardRequest) {
        try {
            boardService.saveContent(writeBoardRequest);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PutMapping("/modify")
    public void modifyContent(@RequestBody BoardDto boardDto) {
        boardService.modifyCotnent(boardDto);
    }






}
