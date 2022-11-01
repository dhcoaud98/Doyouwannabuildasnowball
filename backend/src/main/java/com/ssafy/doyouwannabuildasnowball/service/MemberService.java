package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.DuplicateException;
import com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.domain.collection.Decoration;
import com.ssafy.doyouwannabuildasnowball.dto.member.request.MemberUpdateRequest;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeResponse;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import com.ssafy.doyouwannabuildasnowball.repository.mongo.DecorationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class MemberService {


    private final MemberRepository memberRepository;
    private final SnowglobeRepository snowglobeRepository;
    private final DecorationRepository decorationRepository;

    @Transactional(readOnly = true)
    public MemberMeResponse findByLoginMember(Long memberId) {
        Member findMember = findById(memberId);
        return MemberMeResponse.of(findMember);
    }

    @Transactional(readOnly = true)
    public Member findById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
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
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        // 중복 확인
        if(confirmDuplicateNickname(memberUpdateRequest.getNickname()))
            throw new DuplicateException(DuplicateException.USER_NICKNAME_DUPLICATE);

        memberRepository.updateMemberNickname(member.getMemberId(), memberUpdateRequest.getNickname());
    }

    public Boolean confirmDuplicateNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    public Snowglobe makeDefaultSnowglobe(Long memberId) {

        Optional<Member> memberOptional = memberRepository.findById(memberId);
        Member member;
        if (memberOptional.isPresent())
            member = memberOptional.get();
        else throw new NotFoundException(MEMBER_NOT_FOUND);

        // 새로운 스노우볼 생성
        Snowglobe defaultSnowball = snowglobeRepository.save(
                Snowglobe.builder()
                        .maker(member)
                        .makerSaved(true)
                        .receiver(member)
                        .receiverSaved(true)
                        .screenshot(null)
                        .music(null)
                        .build());
        // 스노우볼 아이디를 회원에게 저장
        memberRepository.updateSnowglobeIdById(member.getMemberId(), defaultSnowball.getSnowglobeId());


        return defaultSnowball;
    }
    public MemberMeResponse userInfo(Long memberId) {
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if(memberOptional.isPresent()) {
            MemberMeResponse memberMeRes = MemberMeResponse.of(memberOptional.get());
            return memberMeRes;
        }
        else
            throw new NotFoundException(MEMBER_NOT_FOUND);
    }



}
