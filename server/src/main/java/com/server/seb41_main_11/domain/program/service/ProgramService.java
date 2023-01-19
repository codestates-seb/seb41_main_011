package com.server.seb41_main_11.domain.program.service;

import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.pay.entity.Pay;
import com.server.seb41_main_11.domain.pay.entity.Pay.Status;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.repository.ProgramRepository;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProgramService {
    private final ProgramRepository programRepository;
    private final CustomBeanUtils<Program> beanUtils;

    public Program createProgram(Program program, Counselor counselor) {
        program.setCounselor(counselor);

        return programRepository.save(program);
    }

    public Program updateProgram(Program program, Counselor counselor) {
        // 유효한 program인지 검증
        Program findProgram = findVerifiedProgram(program.getProgramId());

        Optional.ofNullable(program.getTitle())
            .ifPresent(findProgram::setTitle);
        Optional.ofNullable(program.getContent())
            .ifPresent(findProgram::setContent);
        Optional.ofNullable(program.getImage())
            .ifPresent(findProgram::setImage);
        Optional.ofNullable(program.getUserMax())
            .ifPresent(findProgram::setUserMax);
        Optional.ofNullable(program.getDateStart())
            .ifPresent(findProgram::setDateStart);
        Optional.ofNullable(program.getDateEnd())
            .ifPresent(findProgram::setDateEnd);
        Optional.ofNullable(program.getCost())
            .ifPresent(findProgram::setCost);
        Optional.ofNullable(program.getSymptomTypes())
                .ifPresent(findProgram::setSymptomTypes);

        findProgram.setCounselor(counselor);

        return programRepository.save(findProgram);
    }

    public Program updateProgram(Program program) {
        Program findProgram = findVerifiedProgram(program.getProgramId());

        Optional.ofNullable(program.getZoomLink())
            .ifPresent(findProgram::setZoomLink);
        Optional.ofNullable(program.getAnnounce())
            .ifPresent(findProgram::setAnnounce);

        return programRepository.save(findProgram);
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

    public Program findVerifiedProgramByCounselorId(long counselorId, long programId) {
        Optional<Program> optionalProgram = programRepository.findByProgramIdAndCounselorCounselorId(programId, counselorId);
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
                if(Status.COMPLETE_PAYMENT.equals(p.getStatus())
                || Status.WAITING_CANCEL_PAYMENT.equals(p.getStatus())) {
                    throw new BusinessException(ErrorCode.RESERVATION_EXISTS);
                } else if (Status.CANCEL_PAYMENT.equals(p.getStatus())) {
                    return program;
                }
            }
        }

        return program;
    }

    @Transactional(readOnly = true)
    public Page<Program> searchCounselorProgram(Long counselorId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("program_id").descending());
        Page<Program> programPage = programRepository.findAllByCounselor(counselorId, pageable);
        return programPage;
    }

    public Page<Program> searchProgram(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("programId").descending());
        Page<Program> programPage = programRepository.findAllBySymptomTypes(search, pageable);

        return programPage;
    }
}
