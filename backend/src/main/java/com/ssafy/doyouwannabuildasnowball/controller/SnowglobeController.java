package com.ssafy.doyouwannabuildasnowball.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Music;
import com.ssafy.doyouwannabuildasnowball.dto.music.common.MusicAllDto;
import com.ssafy.doyouwannabuildasnowball.dto.music.request.MusicRecommendationRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.music.request.MusicSelectRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.common.MainSnowglobeDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request.SnowglobeRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request.SnowglobeUpdateRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response.SnowglobeDetailResponseDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response.SnowglobeShelfResponseDto;
import com.ssafy.doyouwannabuildasnowball.service.SnowglobeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/snowglobe")
public class SnowglobeController {
    private final SnowglobeService snowglobeService;

    //메인 스노우볼 페이지*
    @GetMapping("/{member_id}")
    public ResponseEntity<MainSnowglobeDto> mainSnowglobe(@PathVariable(value = "member_id") Long uid) {
        return new ResponseEntity<MainSnowglobeDto>(snowglobeService.mainSnowglobe(uid), HttpStatus.OK);
    }

    //메인 스노우볼 페이지 링크 공유*
    @GetMapping("/{member_id}/share")
    public ResponseEntity<String> shareSnowglobe(@PathVariable(value = "member_id") Long uid) {
        snowglobeService.shareSnowglobe(uid);
        return new ResponseEntity<String>(snowglobeService.shareSnowglobe(uid), HttpStatus.OK);
    }

    //메인 스노우볼 수정*
    @PutMapping("/{member_id}/modify")
    public ResponseEntity<Void> modifySnowglobe(@PathVariable(value = "member_id") Long uid, @JsonProperty @RequestBody SnowglobeUpdateRequestDto snowglobeUpdateRequestDto) {
        snowglobeService.updateSnowglobe(uid, snowglobeUpdateRequestDto);
        return ResponseEntity.ok().build();
    }

    //친구 메인 페이지에서 스노우볼 선물하기*
    @PostMapping("{receiver_id}/present")
    public ResponseEntity<Void> presentSnowglobe(@PathVariable(value = "receiver_id") Long rid, @Valid @RequestBody SnowglobeRequestDto snowglobeRequestDto) {
        snowglobeService.presentSnowglobe(rid, snowglobeRequestDto);
        return ResponseEntity.ok().build();
    }

    //선물한 스노우볼 내 책장에 저장하기*
    @PatchMapping("/save")
    public ResponseEntity<Void> savePresent(Long snowglobeId) {
        snowglobeService.savePresent(snowglobeId);
        return ResponseEntity.ok().build();
    }

    //갖고있는 스노우볼 확인 (내 책장)*
    @GetMapping("/{member_id}/shelf")
    public ResponseEntity<List<SnowglobeShelfResponseDto>> myShelf(@PathVariable(value = "member_id") Long uid) {
        return new ResponseEntity<List<SnowglobeShelfResponseDto>>(snowglobeService.showAllSnowglobe(uid), HttpStatus.OK);
    }

    //책장에서 스노우볼 삭제*
    @PatchMapping("/{snowglobe_id}/delete")
    //Member member
    public ResponseEntity<Void> deleteSnowglobe(@PathVariable(value = "snowglobe_id") Long sid, Member member) {
        snowglobeService.deleteSnowglobe(sid, member.getMemberId());
        return ResponseEntity.ok().build();
    }

    //스노우볼 상세 (마을로 넘어가기)*
    @GetMapping("/{snowglobe_id}/detail")
    public ResponseEntity<SnowglobeDetailResponseDto> snowglobeDetail(@PathVariable(value = "snowglobe_id") Long sid) {
        return new ResponseEntity<SnowglobeDetailResponseDto>(snowglobeService.showDetail(sid), HttpStatus.OK);
    }

    //음악 목록 조회*
    @GetMapping("/music/list")
    public ResponseEntity<List<MusicAllDto>> musicList() {
        return new ResponseEntity<List<MusicAllDto>>(snowglobeService.musicAll(), HttpStatus.OK);
    }

    //음악 변경*
    @PatchMapping("/{snowglobe_id}/music/select")
    public ResponseEntity<Void> musicChange(@PathVariable(value = "snowglobe_id") Long sid, @Valid @RequestBody MusicSelectRequestDto musicSelectRequestDto) {
        log.info("music controller"+musicSelectRequestDto);
        snowglobeService.musicSelect(sid, musicSelectRequestDto);
        return ResponseEntity.ok().build();
    }

//    //음악 추천
//    @GetMapping("/snowglobe/music/recommend")
//    public ResponseEntity<MusicAllDto> musicRecommend(@Valid @RequestBody MusicRecommendationRequestDto musicRecommendationRequestDto) {
//        return new ResponseEntity<MusicAllDto>(snowglobeService.musicRecommend(musicRecommendationRequestDto), HttpStatus.OK);
//    }

}
