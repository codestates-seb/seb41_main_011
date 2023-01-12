package com.server.seb41_main_11.domain.program.service;

import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.repository.ProgramRepository;
import org.springframework.stereotype.Service;

@Service
public class ProgramService {
    private final ProgramRepository programRepository;

    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public Program createProgram(Program program) {
        return programRepository.save(program);
    }
}
