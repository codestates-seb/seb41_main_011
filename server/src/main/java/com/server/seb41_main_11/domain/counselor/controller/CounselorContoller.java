package com.server.seb41_main_11.domain.counselor.controller;

import com.server.seb41_main_11.domain.common.SingleResponseDto;
import com.server.seb41_main_11.domain.counselor.dto.CounselorDto;
import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.counselor.mapper.CounselorMapper;
import com.server.seb41_main_11.domain.counselor.service.CounselorService;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.AuthenticationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/counselors")
@Validated
@RequiredArgsConstructor
public class CounselorContoller {

    private final CounselorService counselorService;

    private final CounselorMapper counselorMapper;
    //회원가입
    @PostMapping
    public ResponseEntity postCounselor(@Valid @RequestBody CounselorDto.Post counselorPostDto){
        if(!counselorPostDto.getPassword().equals(counselorPostDto.getConfirmPassword())){ //비밀번호와 비밀번호 확인이 같지 않으면
            throw new AuthenticationException(ErrorCode.PASSWORD_MISMATCH); //에러 발생
        }

        Counselor counselor = counselorService.createCounselor(counselorMapper.counselorPostDtoToCounselor(counselorPostDto));
        CounselorDto.Response response = counselorMapper.counselorToCounselorResponse(counselor);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }
}
