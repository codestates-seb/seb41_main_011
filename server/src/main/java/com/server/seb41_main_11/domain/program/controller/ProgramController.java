package com.server.seb41_main_11.domain.program.controller;

import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.mapper.ProgramMapper;
import com.server.seb41_main_11.domain.program.service.ProgramService;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/program")
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;
    private final ProgramMapper programMapper;

    @PostMapping
    public ResponseEntity postProgram(@RequestBody ProgramDto.Post requestBody) {
        Program program = programMapper.ProgramPostDtoToProgram(requestBody);
        Program createdProgram = programService.createProgram(program);
        ProgramDto.Response response = programMapper.ProgramToProgramResponseDto(createdProgram);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{program-id}")
    public ResponseEntity patchProgram(@PathVariable("program-id") @Positive Long programId,
        @RequestBody ProgramDto.Patch requestBody) {
        requestBody.setProgramId(programId);
        Program program = programMapper.ProgramPatchDtoToProgram(requestBody);
        Program updatedProgram = programService.updateProgram(program);
        ProgramDto.Response response = programMapper.ProgramToProgramResponseDto(updatedProgram);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
