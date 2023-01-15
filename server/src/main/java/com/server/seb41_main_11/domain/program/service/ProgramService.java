package com.server.seb41_main_11.domain.program.service;

import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.repository.ProgramRepository;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProgramService {
    private final ProgramRepository programRepository;
    private final MemberService memberService;
    private final CustomBeanUtils<Program> beanUtils;

    public Program createProgram(Program program, Long memberId) {
        // token을 통해 얻은 tokenId로 유효한 회원인지 검증
        Member member = memberService.findVerifiedMemberByMemberId(memberId);

        // 해당 회원의 role이 관리자가 아니면 throw
        if(!member.getRole().equals(Role.ADMIN)) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ADMIN);
        }

        // program에 회원 정보 할당
        program.setMember(member);

        return programRepository.save(program);
    }

    public Program updateProgram(Program program, Long memberId) {
        // 유효한 program인지 검증
        Program findProgram = findVerifiedProgram(program.getProgramId());
        // program에 등록된 회원 조회
        Member findMember = findProgram.getMember();
        // tokenId를 통해 유효한 회원인지 검증
        Member tokenMember = memberService.findVerifiedMemberByMemberId(memberId);

        // program에 등록된 role과 tokenId의 role이 일치하는지 검증
        if(findMember.getRole() != tokenMember.getRole()) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ADMIN);
        }

        // 전달받은 program 데이터를 기존 데이터와 교체
        Program updatedProgram = beanUtils.copyNonNullProperties(program, findProgram);

        return programRepository.save(updatedProgram);
    }

    @Transactional(readOnly = true)
    public Program findProgram(long programId) {
        Program findProgram = findVerifiedProgram(programId);
        return findProgram;
    }

    @Transactional(readOnly = true)
    public Page<Program> findPrograms(int page, int size) {
        return programRepository.findAll(PageRequest.of(page, size, Sort.by("programId").descending()));
    }

    public Program findVerifiedProgram(long programId) {
        Optional<Program> optionalProgram = programRepository.findById(programId);
        Program findProgram = optionalProgram.orElseThrow(
            () -> new BusinessException(ErrorCode.PROGRAM_NOT_FOUND)
        );

        return findProgram;
    }

    public void deleteProgram(long programId) {
        Program findProgram = findVerifiedProgram(programId);

        programRepository.delete(findProgram);
    }
}
