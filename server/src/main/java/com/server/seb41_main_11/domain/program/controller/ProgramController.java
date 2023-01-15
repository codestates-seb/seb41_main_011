package com.server.seb41_main_11.domain.program.controller;

import com.server.seb41_main_11.domain.common.MultiResponseDto;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.mapper.ProgramMapper;
import com.server.seb41_main_11.domain.program.service.ProgramService;
import com.server.seb41_main_11.global.jwt.service.TokenManager;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/program")
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;
    private final ProgramMapper programMapper;
    private final TokenManager tokenManager;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity postProgram(HttpServletRequest httpServletRequest,
        @RequestBody ProgramDto.Post requestBody) {

        Program program = programMapper.ProgramPostDtoToProgram(requestBody);
        Program createdProgram = programService.createProgram(program,
            memberService.getLoginMemberId(httpServletRequest));

        ProgramDto.Response response = programMapper.ProgramToProgramResponseDto(createdProgram);
        return new ResponseEntity<>(
            new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{program-id}")
    public ResponseEntity patchProgram(HttpServletRequest httpServletRequest,
        @PathVariable("program-id") @Positive Long programId,
        @RequestBody ProgramDto.Patch requestBody) {

        requestBody.setProgramId(programId);
        Program program = programMapper.ProgramPatchDtoToProgram(requestBody);
        Program updatedProgram = programService.updateProgram(program,
            memberService.getLoginMemberId(httpServletRequest));
        ProgramDto.Response response = programMapper.ProgramToProgramResponseDto(updatedProgram);

        return new ResponseEntity<>(
            new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{program-id}")
    public ResponseEntity getProgram(@PathVariable("program-id") @Positive Long programId) {
        Program program = programService.findProgram(programId);
        ProgramDto.Response response = programMapper.ProgramToProgramResponseDto(program);
        return new ResponseEntity<>(
            new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPrograms(@Positive @RequestParam(defaultValue = "1") int page,
        @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Program> programPage = programService.findPrograms(page-1, size);
        List<Program> programs = programPage.getContent();
        List<ProgramDto.Response> response = programMapper.ProgramsToProgramResponseDtos(programs);

        return new ResponseEntity<>(
            new MultiResponseDto<>(programs, programPage), HttpStatus.OK);
    }

    @DeleteMapping("/{program-id}")
    public ResponseEntity deleteProgram(@PathVariable("program-id") @Positive Long programId) {
        programService.deleteProgram(programId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
