package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.CustomException;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Decoration;
import com.ssafy.doyouwannabuildasnowball.dto.member.request.MemberUpdateRequest;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeResponse;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MusicRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import com.ssafy.doyouwannabuildasnowball.repository.mongo.DecorationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static com.ssafy.doyouwannabuildasnowball.common.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {


    private final MemberRepository memberRepository;
    private final SnowglobeRepository snowglobeRepository;
    private final DecorationRepository decorationRepository;
    private final MusicRepository musicRepository;
    private final String DEFAULT_SCREENSHOT_URL = "https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/DEFAULT.png";
    @Transactional(readOnly = true)
    public MemberMeResponse findByLoginMember(Long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        return MemberMeResponse.of(findMember);
    }

    @Transactional
    public Member createMember(Member member) {
        Member newMember = memberRepository.save(member);
        Snowglobe snowglobe = makeDefaultSnowglobe(member.getMemberId());
        newMember.setSnowglobe(snowglobe);
        Decoration decoration = new Decoration(snowglobe.getSnowglobeId());
        decorationRepository.save(decoration);

        return newMember;
    }


    @Transactional
    public void updateUserInfo(MemberUpdateRequest memberUpdateRequest) {
        Member member = memberRepository.findById(memberUpdateRequest.getMemberId())
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        // 중복 확인
        if(confirmDuplicateNickname(memberUpdateRequest.getNickname()))
            throw new CustomException(NICKNAME_DUPLICATE_RESOURCE);
        memberRepository.updateMemberNickname(member.getMemberId(), memberUpdateRequest.getNickname());
    }

    public Boolean confirmDuplicateNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    public Snowglobe makeDefaultSnowglobe(Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        // 새로운 스노우볼 생성
        Snowglobe defaultSnowball = snowglobeRepository.save(
                Snowglobe.builder()
                        .maker(member)
                        .makerSaved(true)
                        .receiver(member)
                        .receiverSaved(true)
                        .screenshot(DEFAULT_SCREENSHOT_URL)
                        .music(musicRepository.findById(0L).orElseThrow(()->new CustomException(MUSIC_NOT_FOUND)))
                        .build());
        // 스노우볼 아이디를 회원에게 저장
        memberRepository.updateSnowglobeIdById(member.getMemberId(), defaultSnowball.getSnowglobeId());

        return defaultSnowball;
    }

    public MemberMeResponse userInfo(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        MemberMeResponse memberMeRes = MemberMeResponse.of(member);
        return memberMeRes;
    }

    @Transactional
    public void logout(Long memberId) {
        log.info(String.valueOf(memberId));
        memberRepository.deleteRefreshTokenByMemberId(memberId);
    }
}
