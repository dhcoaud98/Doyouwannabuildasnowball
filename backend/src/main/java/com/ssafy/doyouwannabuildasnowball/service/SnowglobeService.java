package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.BadRequestException;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.domain.User;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Decoration;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.common.MainSnowglobeDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request.SnowglobeRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request.SnowglobeUpdateRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response.SnowglobeDetailResponseDto;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.UserRepository;
import com.ssafy.doyouwannabuildasnowball.repository.mongo.DecorationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class SnowglobeService {
    private final UserRepository userRepository;
    private final SnowglobeRepository snowglobeRepository;
    private final DecorationRepository decorationRepository;

    //메인 스노우볼 페이지
    //user_id > uid
    @Transactional
    public MainSnowglobeDto mainSnowglobe(Long uid) {
        //메인 스노우볼 아이디 main_id > mid
        Long mid = userRepository.getMainIdById(uid);
        Snowglobe snowglobe = snowglobeRepository.findById(mid).orElseThrow(() -> new BadRequestException("유효하지 않은 스노우볼입니다."));
        return MainSnowglobeDto.builder()
                .snowglobeId(snowglobe.getSnowglobeId())
                .decorateId(snowglobe.getDecorateId())
                .screenshot(snowglobe.getScreenshot())
                .music(snowglobe.getMusic())
                .build();
    }

    //메인 스노우볼 페이지 링크 공유
    //url = `https://서버 주소/share?userId=${userId}`
    @Transactional
    public String shareSnowglobe(Long uid) {
        String url = "https://서버 주소/share?userId=${uid}";
        return url;
    }

    //메인 스노우볼 수정
    @Transactional
    public void updateSnowglobe(Long uid, SnowglobeUpdateRequestDto snowglobeUpdateRequestDto) {
        //메인 스노우볼 아이디 main_id > mid
        Long mid = userRepository.getMainIdById(uid);
        Snowglobe snowglobe = snowglobeRepository.findById(mid).orElseThrow(() -> new BadRequestException("유효하지 않은 스노우볼입니다."));
        //decorateId 받아서 mongo - decoration 데이터 update 추가
        Decoration decoById = decorationRepository.findById(snowglobe.getDecorateId()).orElseThrow(() -> new BadRequestException("유효하지 않은 요소입니다."));
        decoById.setDeco(snowglobeUpdateRequestDto.getDecoration());
        decorationRepository.save(decoById);
    }

    //친구 메인 페이지에서 스노우볼 선물하기
    @Transactional
    public Snowglobe presentSnowglobe(Long rid, SnowglobeRequestDto snowglobeRequestDto, User user) {
        User receiver = userRepository.findById(rid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        return Snowglobe.builder()
                .maker(user)
                .receiver(receiver)
                .decorateId(snowglobeRequestDto.getDecorateId())
                .makerSaved(false)
                .receiverSaved(true)
                .screenshot(snowglobeRequestDto.getScreenshot())
                .music(snowglobeRequestDto.getMusic())
                .build();
    }


    //선물한 스노우볼 내 책장에 저장
    @Transactional
    public void savePresent(Long snowglobeId, User user) {
        Snowglobe snowglobe = snowglobeRepository.findById(snowglobeId).orElseThrow(() -> new BadRequestException("유효하지 않은 스노우볼입니다."));
        Long mid = snowglobe.getMaker().getUserId();
        if (mid == user.getUserId()) {
            snowglobe.setMakerSaved(true);
            snowglobeRepository.save(snowglobe);
        } else {
            new BadRequestException("유효하지 않은 요청입니다.");
        }
    }

    //갖고있는 스노우볼 확인 (내 책장)
    @Transactional
    public PageImpl<Snowglobe> showAllSnowglobe(Long uid, Pageable pageable) {
        return snowglobeRepository.findAllByMakerIdAndReceiverId(uid, pageable);
    }

    //책장에서 스노우볼 삭제
    @Transactional
    public void deleteSnowglobe(Long sid, User user) {
        Snowglobe snowglobe = snowglobeRepository.findById(sid).orElseThrow(() -> new BadRequestException("유효하지 않은 스노우볼입니다."));
        if (user.getUserId().equals(snowglobe.getMaker().getUserId())) {
            snowglobe.setMakerSaved(false);
            snowglobeRepository.save(snowglobe);
        } else if (user.getUserId().equals(snowglobe.getReceiver().getUserId())) {
            snowglobe.setReceiverSaved(false);
            snowglobeRepository.save(snowglobe);
        } else {
            new BadRequestException("삭제할 수 없는 스노우볼입니다.");
        }
    }

    //스노우볼 상세 (마을로 넘어가기)
    @Transactional
    public SnowglobeDetailResponseDto showDetail(Long sid) {
        Snowglobe snowglobe = snowglobeRepository.findById(sid).orElseThrow(() -> new BadRequestException("유효하지 않은 스노우볼입니다."));
        Decoration decoration = decorationRepository.findById(snowglobe.getDecorateId()).orElseThrow(() -> new BadRequestException("유효하지 않은 요소입니다."));
        return SnowglobeDetailResponseDto.builder()
                .decorationId(decoration.getId())
                .deco(decoration.getDeco())
                .build();
    }

    //음악 목록 조회


    //음악 변경

}
