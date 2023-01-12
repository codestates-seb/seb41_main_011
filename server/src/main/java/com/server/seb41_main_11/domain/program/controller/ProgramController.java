package com.server.seb41_main_11.domain.program.controller;

import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.mapper.ProgramMapper;
import com.server.seb41_main_11.domain.program.service.ProgramService;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/{program-id}")
    public ResponseEntity getProgram(@PathVariable("program-id") @Positive Long programId) {
        Program program = programService.findProgram(programId);
        ProgramDto.Response response = programMapper.ProgramToProgramResponseDto(program);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPrograms(@PageableDefault(size = 10, sort = "programId", direction =  Direction.DESC)
        Pageable pageable) {

        Page<Program> programPage = programService.findPrograms(pageable);
        List<Program> programs = programPage.getContent();

        return new ResponseEntity<>(programs, HttpStatus.OK);
    }

    @DeleteMapping("/{program-id}")
    public ResponseEntity deleteProgram(@PathVariable("program-id") @Positive Long programId) {
        programService.deleteProgram(programId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
