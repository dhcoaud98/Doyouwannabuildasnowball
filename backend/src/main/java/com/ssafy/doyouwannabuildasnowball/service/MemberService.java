package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.domain.Snowglobe;
import com.ssafy.doyouwannabuildasnowball.dto.member.request.MemberUpdateRequest;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeRes;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.SnowglobeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class MemberService {


    private final MemberRepository memberRepository;
    private final SnowglobeRepository snowglobeRepository;

    @Transactional(readOnly = true)
    public MemberMeRes findByLoginMember(Long memberId) {
        Member findMember = findById(memberId);
        return MemberMeRes.of(findMember);
    }

    @Transactional(readOnly = true)
    public Member findById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }

    public void updateUserInfo(MemberUpdateRequest memberUpdateRequest) {
        Optional<Member> memberOptional = memberRepository.findById(memberUpdateRequest.getKakaoId());
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setNickname(memberUpdateRequest.getNickname());
            memberRepository.save(member);
        } else throw new NotFoundException(USER_NOT_FOUND);

    }

    public Boolean confirmDuplicateNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    public void makeDefaultSnowglobe(Long memberId) {

        Optional<Member> memberOptional = memberRepository.findById(memberId);
        Member member;
        if (memberOptional.isPresent())
            member = memberOptional.get();
        else throw new NotFoundException(USER_NOT_FOUND);

        // 새로운 스노우볼 생성
        snowglobeRepository.save(
            Snowglobe.builder()
                .maker(member)
                .makerSaved(true)
                .receiver(member)
                .receiverSaved(true)
                .screenshot(null)
                .music(null)
                .build());
        // 스노우볼 아이디를 회원에게 저장


    }


    public Member userInfo(String memberId) {
        return memberRepository.findById(Long.valueOf(memberId)).get();
    }
}
