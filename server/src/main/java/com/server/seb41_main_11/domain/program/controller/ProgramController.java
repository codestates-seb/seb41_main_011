package com.server.seb41_main_11.domain.program.controller;

import com.server.seb41_main_11.domain.common.MultiResponseDto;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.mapper.ProgramMapper;
import com.server.seb41_main_11.domain.program.service.ProgramService;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.Getter;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;
    private final ProgramMapper programMapper;

    // 화면정의서 30p
    // 프로그램 생성
    @PostMapping("/post")
    public ResponseEntity postProgram(@RequestBody ProgramDto.Post requestBody) {

        Program program = programMapper.ProgramPostDtoToProgram(requestBody);
        Program createdProgram = programService.createProgram(program);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 화면정의서 31p
    // 프로그램 정보 수정
    @PatchMapping("/patch/{program-id}")
    public ResponseEntity patchProgram(@PathVariable("program-id") @Positive Long programId,
        @RequestBody ProgramDto.Patch requestBody) {

        requestBody.setProgramId(programId);
        Program program = programMapper.ProgramPatchDtoToProgram(requestBody);
        Program updatedProgram = programService.updateProgram(program);
        ProgramDto.Response response = programMapper.ProgramToProgramResponseDto(updatedProgram);

        return new ResponseEntity<>(
            new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 화면정의서 8p
    // 개별 프로그램 조회
    @GetMapping("/lookup/{program-id}")
    public ResponseEntity getProgram(@PathVariable("program-id") @Positive Long programId) {
        Program program = programService.findProgram(programId);
        ProgramDto.Response response = programMapper.ProgramToProgramResponseDto(program);
        return new ResponseEntity<>(
            new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 화면정의서 6p, 12p
    // 전체 프로그램 조회
    @GetMapping("/lookup/list")
    public ResponseEntity getPrograms(@Positive @RequestParam(defaultValue = "1") int page,
        @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Program> programPage = programService.findPrograms(page-1, size);
        List<Program> programs = programPage.getContent();
        List<ProgramDto.PageResponse> response = programMapper.ProgramsToProgramResponseDtos(programs);

        return new ResponseEntity<>(
            new MultiResponseDto<>(response, programPage), HttpStatus.OK);
    }

    // 화면정의서 25p
    // 상담사 - 마이페이지 나의 프로그램 개별 조회
//    @GetMapping("/{counselor-id}/lookup/{program-id}")
//    public ResponseEntity getCounselorProgram(@PathVariable("counselor-id") @Positive Long counselorId,
//        @PathVariable("program-id") @Positive Long programId) {
//        // pull받은 후 카운슬러 매핑 필요
//        return new ResponseEntity<>(
//            new SingleResponseDto<>(), HttpStatus.OK);
//    }

    // 화면정의서 24p
    // 상담사 - 마이페이지 나의 프로그램 전체 조회
    @GetMapping("/{counselor-id}/lookup/list")
    public ResponseEntity getCounselorPrograms(@PathVariable("counselor-id") @Positive Long counselorId,
        @Positive @RequestParam(defaultValue = "1") int page,
        @Positive @RequestParam(defaultValue = "10") int size) {

        Page<Program> CounselorProgramPage = programService.searchCounselorProgram(counselorId, page-1, size);
        List<Program> programList = CounselorProgramPage.getContent();
        List<ProgramDto.CounselorProgramResponse> response = programMapper.ProgramsToCounselorProgramResponseDtos(programList);


        return new ResponseEntity(
            new MultiResponseDto<>(
                response, CounselorProgramPage), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{program-id}")
    public ResponseEntity deleteProgram(@PathVariable("program-id") @Positive Long programId) {
        programService.deleteProgram(programId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
