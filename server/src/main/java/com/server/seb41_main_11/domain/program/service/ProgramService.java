package com.server.seb41_main_11.domain.program.service;

import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.repository.ProgramRepository;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import java.util.Optional;
import lombok.Builder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Builder
public class ProgramService {
    private final ProgramRepository programRepository;

    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public Program createProgram(Program program) {
        return programRepository.save(program);
    }

    public Program updateProgram(Program program) {
        Program findProgram = findVerifiedProgram(program.getProgramId());

        return programRepository.save(Program.of(program));
    }

    public Program findProgram(long programId) {
        Program findProgram = findVerifiedProgram(programId);
        return findProgram;
    }

    public Page<Program> findPrograms(Pageable pageable) {
        return programRepository.findAll(pageable);
    }

    public Program findVerifiedProgram(long programId) {
        Optional<Program> optionalProgram = programRepository.findById(programId);
        Program findProgram = optionalProgram.orElseThrow(
            () -> new BusinessException(ErrorCode.PROGRAM_NOT_FOUND)
        );

        return findProgram;
    }
}
