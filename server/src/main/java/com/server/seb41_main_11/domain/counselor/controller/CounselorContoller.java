package com.server.seb41_main_11.domain.counselor.controller;

import com.server.seb41_main_11.domain.common.MultiResponseDto;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import com.server.seb41_main_11.domain.counselor.dto.CounselorDto;
import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.counselor.mapper.CounselorMapper;
import com.server.seb41_main_11.domain.counselor.service.CounselorService;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.AuthenticationException;
import com.server.seb41_main_11.global.error.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/counselors")
@Validated
@RequiredArgsConstructor
public class CounselorContoller {

    private final CounselorService counselorService;

    private final CounselorMapper counselorMapper;

    /**
     * 상담사 등록
     */
    @PostMapping("/new")
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

    /**
     * 상담사 로그인
     * 기본 회원과 다르게 MemberType 사용되지 않음
     */
    @PostMapping("/login")
    public ResponseEntity loginCounselor(@Valid @RequestBody CounselorDto.Login counselorLogindto){

        CounselorDto.LoginResponse jwtTokenResponseDto = counselorService.login(counselorMapper.counselorLoginDtoToCounselor(counselorLogindto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(jwtTokenResponseDto), HttpStatus.OK
        );
    }

    /**
     * 상담사 조회(상담사 정보 수정 페이지)
     */
    @GetMapping("/look-up/{counselorId}")
    public ResponseEntity getCounselor(@PathVariable("counselorId")@Positive Long counselorId){
        Counselor counselor = counselorService.findVerifiedCounselorByCounselorId(counselorId);
        CounselorDto.MyPageResponse response = counselorMapper.counselorToMyPageResponse(counselor);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    /**
     * 상담사 전체 조회
     */
    /**
     * 회원 전체 조회
     * todo: 상담 횟수 필드 추가
     */
    @GetMapping("/total-look-up")
    public ResponseEntity getMembers(@Positive @RequestParam("page") int page,
                                     @Positive @RequestParam("size") int size){
        Page<Counselor> pageCounselors = counselorService.findMembers(page-1, size);
        List<Counselor> counselors = pageCounselors.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                counselorMapper.counselorsToCounselorMyPageResponses(counselors), pageCounselors)
                ,HttpStatus.OK);
    }

    /**
     * 상담사 정보 수정
     */
    @PatchMapping("/edit/{counselorId}")
    public ResponseEntity updateCounselor(@PathVariable("counselorId")@Positive Long counserlorId,
                                          @Valid @RequestBody CounselorDto.Patch counselorPatchDto){
        counselorPatchDto.updateCounselorId(counserlorId);

        Counselor preCounselor = counselorService.findVerifiedCounselorByCounselorId(counserlorId);

        if (!counselorPatchDto.getNewPassword().equals(counselorPatchDto.getConfirmNewPassword())) {
            throw new EntityNotFoundException(ErrorCode.PASSWORD_MISMATCH);
        }

        String password = counselorService.decryptPassword(preCounselor.getPassword());

        if (!password.equals(counselorPatchDto.getPassword())) {
            throw new AuthenticationException(ErrorCode.WRONG_PASSWROD);
        }

        Counselor counselor = counselorService.updateCounselor(counselorMapper.counselorPatchDtoToCounselor(counselorPatchDto));
        CounselorDto.MyPageResponse response = counselorMapper.counselorToMyPageResponse(counselor);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    /**
     * 상담사 삭제
     */
    @DeleteMapping("/delete/{counselorId}")
    public ResponseEntity deleteCounselor(@PathVariable("counselorId") @Positive Long counselorId){
        counselorService.deleteCounselor(counselorId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
