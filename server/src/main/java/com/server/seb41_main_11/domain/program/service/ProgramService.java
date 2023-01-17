package com.server.seb41_main_11.domain.program.service;

import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.pay.entity.Pay;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.repository.ProgramRepository;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProgramService {
    private final ProgramRepository programRepository;
    private final CustomBeanUtils<Program> beanUtils;

    public Program createProgram(Program program) {

        return programRepository.save(program);
    }

    public Program updateProgram(Program program) {
        // 유효한 program인지 검증
        Program findProgram = findVerifiedProgram(program.getProgramId());

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

    public Program findVerifiedExistsReserveProgram(long memberId, long programId) {
        Program program = findProgram(programId);
        List<Pay> payList = program.getPayList();

        for(Pay p : payList) {
            if(Objects.equals(p.getMember().getMemberId(), memberId)) {
                throw new BusinessException(ErrorCode.RESERVATION_EXISTS);
            }
        }

        return program;
    }

    @Transactional(readOnly = true)
    public Page<Program> searchCounselorProgram(Long counselorId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());

        List<Program> searchResult = programRepository.findAllByCounselor(counselorId);

        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchResult.size());
        Page<Program> programs = new PageImpl<>(searchResult.subList(start, end), pageRequest, searchResult.size());

        return programs;
    }
}
