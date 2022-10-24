package com.ssafy.doyouwannabuildasnowball.controller;

import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.domain.User;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.common.MainSnowglobeDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request.SnowglobeRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request.SnowglobeUpdateRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response.SnowglobeDetailResponseDto;
import com.ssafy.doyouwannabuildasnowball.service.SnowglobeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/snowglobe")
public class SnowglobeController {
    private final User user;
    private final SnowglobeService snowglobeService;

    //메인 스노우볼 페이지
    @GetMapping("/{user_id}")
    public ResponseEntity<MainSnowglobeDto> mainSnowglobe(@PathVariable(value = "user_id") Long uid) {
        return new ResponseEntity<MainSnowglobeDto>(snowglobeService.mainSnowglobe(uid), HttpStatus.OK);
    }

    //메인 스노우볼 페이지 링크 공유
    @GetMapping("/{user_id}/share")
    public ResponseEntity<String> shareSnowglobe(@PathVariable(value = "user_id") Long uid) {
        return new ResponseEntity<String>(snowglobeService.shareSnowglobe(uid), HttpStatus.OK);
    }

    //메인 스노우볼 수정
    @PatchMapping("/{user_id}/modify")
    public ResponseEntity<Void> modifySnowglobe(@PathVariable(value = "user_id") Long uid, @Valid @RequestBody SnowglobeUpdateRequestDto snowglobeUpdateRequestDto) {
        snowglobeService.updateSnowglobe(uid, snowglobeUpdateRequestDto);
        return ResponseEntity.ok().build();
    }

    //친구 메인 페이지에서 스노우볼 선물하기
    @PostMapping("{receiver_id}/present")
    public ResponseEntity<Snowglobe> presentSnowglobe(@PathVariable(value = "receiver_id") Long rid, @Valid @RequestBody SnowglobeRequestDto snowglobeRequestDto, User user) {
        return new ResponseEntity<Snowglobe>(snowglobeService.presentSnowglobe(rid, snowglobeRequestDto, user), HttpStatus.OK);
    }

    //선물한 스노우볼 내 책장에 저장하기
    @PatchMapping("/save")
    public ResponseEntity<Void> savePresent(Long snowglobeId, User user) {
        snowglobeService.savePresent(snowglobeId, user);
        return ResponseEntity.ok().build();
    }

    //갖고있는 스노우볼 확인 (내 책장)
    @GetMapping("/{user_id}/shelf")
    public ResponseEntity<PageImpl<Snowglobe>> myShelf(@PathVariable(value = "user_id") Long uid, Pageable pageable) {
        return new ResponseEntity<PageImpl<Snowglobe>>(snowglobeService.showAllSnowglobe(uid, pageable), HttpStatus.OK);
    }

    //책장에서 스노우볼 삭제
    @PatchMapping("/{snowglobe_id}/delete")
    public ResponseEntity<Void> deleteSnowglobe(@PathVariable(value = "snowglobe_id") Long sid, User user) {
        snowglobeService.deleteSnowglobe(sid, user);
        return ResponseEntity.ok().build();
    }

    //스노우볼 상세 (마을로 넘어가기)
    @GetMapping("/{snowglobe_id}/detail")
    public ResponseEntity<SnowglobeDetailResponseDto> snowglobeDetail(@PathVariable(value = "snowglobe_id") Long sid) {
        return new ResponseEntity<SnowglobeDetailResponseDto>(snowglobeService.showDetail(sid), HttpStatus.OK);
    }

    //음악 목록 조회


    //음악 변경

}
