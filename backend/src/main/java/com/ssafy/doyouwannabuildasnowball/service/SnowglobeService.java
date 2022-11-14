package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.BadRequestException;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Music;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Element;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Decoration;
import com.ssafy.doyouwannabuildasnowball.dto.music.common.MusicAllDto;
import com.ssafy.doyouwannabuildasnowball.dto.music.request.MusicSelectRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.common.MainSnowglobeDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request.SnowglobeRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.request.SnowglobeUpdateRequestDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response.SnowglobeDetailResponseDto;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response.SnowglobeShelfResponseDto;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MusicRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import com.ssafy.doyouwannabuildasnowball.repository.mongo.DecorationRepository;
//import javafx.embed.swing.SwingNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.doyouwannabuildasnowball.common.exception.BadRequestException.*;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class SnowglobeService {
    private final MemberRepository memberRepository;
    private final SnowglobeRepository snowglobeRepository;
    private final DecorationRepository decorationRepository;
    public final MusicRepository musicRepository;

    //메인 스노우볼 페이지
    //user_id > uid
    @Transactional
    public MainSnowglobeDto mainSnowglobe(Long uid) {
        Member member = memberRepository.findById(uid).orElseThrow(() -> new BadRequestException(MEMBER_BAD_REQUEST));
        Snowglobe snowglobe = member.getSnowglobe();
        Decoration decoration = decorationRepository.findById(snowglobe.getSnowglobeId()).orElseThrow(() -> new BadRequestException(DECORATION_BAD_REQUEST));

        return MainSnowglobeDto.builder()
                .snowglobeId(snowglobe.getSnowglobeId())
                .deco(decoration.getDeco())
                .musicId(snowglobe.getMusic().getMusicId())
                .build();
    }

    //메인 스노우볼 페이지 링크 공유
    //url = `https://서버 주소/share?userId=${userId}`
    @Transactional
    public String shareSnowglobe(Long mid) {
        String url = "https://localhost:8080/share?memberId="+mid;
        return url;
    }

    //메인 스노우볼 수정
    @Transactional
    public void updateSnowglobe(Long uid, SnowglobeUpdateRequestDto snowglobeUpdateRequestDto) {
        //메인 스노우볼 아이디 main_id > mid
        Member member = memberRepository.findById(uid).orElseThrow(() -> new BadRequestException(MEMBER_BAD_REQUEST));
        Snowglobe snowglobe = member.getSnowglobe();
        snowglobe.updateScreenshot(snowglobeUpdateRequestDto.getScreenshot());

        List<Element> deco = snowglobeUpdateRequestDto.getDeco();

        Decoration decoById = decorationRepository.findById(snowglobe.getSnowglobeId()).orElseThrow(() -> new BadRequestException(DECORATION_BAD_REQUEST));
        decoById.updateDeco(snowglobe.getSnowglobeId(), deco);
        
        decorationRepository.save(decoById);
        snowglobeRepository.save(snowglobe);
    }

    //친구 메인 페이지에서 스노우볼 선물하기
    @Transactional
    public Long presentSnowglobe(Long rid, SnowglobeRequestDto snowglobeRequestDto) {
        Member maker = memberRepository.findById(snowglobeRequestDto.getMakerId()).orElseThrow(() -> new BadRequestException(MEMBER_BAD_REQUEST));
        Member receiver = memberRepository.findById(rid).orElseThrow(() -> new BadRequestException(MEMBER_BAD_REQUEST));
        Snowglobe snowglobe = Snowglobe.builder()
                .maker(maker)
                .screenshot(snowglobeRequestDto.getScreenshot())
                .receiver(receiver)
                .makerSaved(false)
                .receiverSaved(true)
                .build();

        snowglobeRepository.save(snowglobe);

        Decoration decoration = Decoration.builder()
                .id(snowglobe.getSnowglobeId())
                .deco(snowglobeRequestDto.getDeco())
                .build();

        decorationRepository.save(decoration);

        Long sid = snowglobe.getSnowglobeId();
        return sid;
    }


    //선물한 스노우볼 내 책장에 저장
    @Transactional
    public void savePresent(Long snowglobeId) {
        Snowglobe snowglobe = snowglobeRepository.findById(snowglobeId).orElseThrow(() -> new BadRequestException(SNOWGLOBE_BAD_REQUEST));
        if (!snowglobe.isMakerSaved()) {
            snowglobe.updateMakerSaved(!snowglobe.isMakerSaved());
        } else {
            log.info("이미 저장된 스노우볼입니다.");
        }
        snowglobeRepository.save(snowglobe);
    }

    //갖고있는 스노우볼 확인 (내 책장 / 메인 스노우볼 포함)
    @Transactional
    public List<SnowglobeShelfResponseDto> showAllSnowglobe(Long uid) {
        return snowglobeRepository.findAllByMakerIdAndReceiverId(uid);
    }

    //책장에서 스노우볼 삭제
    @Transactional
    public void deleteSnowglobe(Long sid, Long mid) {
        Snowglobe snowglobe = snowglobeRepository.findById(sid).orElseThrow(() -> new BadRequestException(SNOWGLOBE_BAD_REQUEST));
        if (mid.equals(snowglobe.getMaker().getMemberId())) {
            snowglobe.updateMakerSaved(false);
            snowglobeRepository.save(snowglobe);
        } else if (mid.equals(snowglobe.getReceiver().getMemberId())) {
            snowglobe.updateReceiverSaved(false);
            snowglobeRepository.save(snowglobe);
        } else {
            throw new BadRequestException(SNOWGLOBE_BAD_REQUEST);
        }
    }

    //스노우볼 상세 (마을로 넘어가기)
    @Transactional
    public SnowglobeDetailResponseDto showDetail(Long sid) {
        Decoration decoration = decorationRepository.findById(sid).orElseThrow(() -> new BadRequestException(DECORATION_BAD_REQUEST));
        return SnowglobeDetailResponseDto.builder()
                .snowglobeId(sid)
                .deco(decoration.getDeco())
                .build();
    }

    //음악 목록 조회
    @Transactional
    public List<MusicAllDto> musicAll() {
        List<MusicAllDto> result = new ArrayList<>();
        List<Music> musicList = musicRepository.findAll();
        for (Music music : musicList) {
            result.add(MusicAllDto.builder()
                    .musicId(music.getMusicId())
                    .title(music.getTitle())
                    .url(music.getUrl())
                    .categoryId(music.getCategory().getCategoryId())
                    .categoryName(music.getCategory().getCategoryName())
                    .build());
        }
        return result;
    }

    //음악 변경
    @Transactional
    public void musicSelect(Long sid, MusicSelectRequestDto musicSelectRequestDto) {
        Snowglobe snowglobe = snowglobeRepository.findById(sid).orElseThrow(() -> new BadRequestException(SNOWGLOBE_BAD_REQUEST));
        Music music = musicRepository.findById(musicSelectRequestDto.getMusicId()).orElseThrow(() -> new BadRequestException(MUSIC_BAD_REQUEST));
        snowglobe.updateMusic(music);
        snowglobeRepository.save(snowglobe);
    }

//    //음악 추천
//    @Transactional
//    public MusicAllDto musicRecommend(MusicRecommendationRequestDto musicRecommendationRequestDto) {
//
//    }

}
