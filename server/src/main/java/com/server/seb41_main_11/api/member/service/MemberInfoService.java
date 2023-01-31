package com.server.seb41_main_11.api.member.service;

import com.server.seb41_main_11.api.member.dto.MemberInfoResponseDto;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * MemberInfoController에서 사용되는 서비스, 회원 정보를 가져옴
 */
@Service
@RequiredArgsConstructor
public class MemberInfoService {

    private final MemberService memberService;

    @Transactional(readOnly = true)
    public MemberInfoResponseDto getMemberInfo(Long memberId) {
        Member member = memberService.findVerifiedMemberByMemberId(memberId);
        return MemberInfoResponseDto.of(member);
    }

}
