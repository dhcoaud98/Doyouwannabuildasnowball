package com.ssafy.doyouwannabuildasnowball.service;

import com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.dto.member.response.MemberMeRes;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.doyouwannabuildasnowball.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class MemberService {


    private final MemberRepository memberRepository;

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
}
