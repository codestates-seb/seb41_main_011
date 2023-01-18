package com.server.seb41_main_11.domain.pay.controller;

import com.server.seb41_main_11.domain.common.MultiResponseDto;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.pay.dto.PayDto;
import com.server.seb41_main_11.domain.pay.entity.Pay;
import com.server.seb41_main_11.domain.pay.mapper.PayMapper;
import com.server.seb41_main_11.domain.pay.service.PayService;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pays")
@RequiredArgsConstructor
public class PayController {
    private final PayMapper payMapper;
    private final PayService payService;
    private final MemberService memberService;

    // 화면정의서 9p
    // 유저 - 결제(예약)하기
    @PostMapping("/{program-id}/post")
    public ResponseEntity postPay(@PathVariable("program-id") @Positive Long programId,
        HttpServletRequest httpServletRequest,
        @RequestBody PayDto.Post requestBody) {
        Pay pay = payMapper.PayPostDtoToPay(requestBody);
        Pay completedPay = payService.createPay(pay, programId, memberService.getLoginMember(httpServletRequest));

        PayDto.PostResponse response = payMapper.PayToPayPostResponseDto(completedPay);

        return new ResponseEntity<>(
            new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // 화면정의서 23p
    // 유저 - 예약된 프로그램 개별 조회
    @GetMapping("/lookup/{pay-id}")
    public ResponseEntity getUserReserveProgram(@PathVariable("pay-id") @Positive Long payId) {
        Pay findReserveProgram = payService.findReservation(payId);
        PayDto.GetResponse response = payMapper.PayToPayGetResponseDto(findReserveProgram);
        return new ResponseEntity<>(
            new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 화면정의서 22p
    // 유저 - 마이페이지 나의 프로그램 예약 내역 전체 조회
    @GetMapping("/{member-id}/lookup/list")
    public ResponseEntity getUserReservePrograms(@PathVariable("member-id") @Positive Long memberId,
        @Positive @RequestParam(defaultValue = "1") int page,
        @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Pay> myReserveProgramPage = payService.searchMyReserveProgram(memberId, page-1, size);
        List<Pay> payList = myReserveProgramPage.getContent();
        List<PayDto.MyPageProgramResponse> response = payMapper.ReserveProgramToMyPageProgramResponse(payList);


        return new ResponseEntity(
            new MultiResponseDto<>(
                response, myReserveProgramPage), HttpStatus.OK);
    }

    // 화면정의서 33p
    // 관리자 - 마이페이지 유저 상담 내역 전체 조회
    @GetMapping("/admin/lookup/list")
    public ResponseEntity getAdminReservePrograms(@PathVariable("member-id") @Positive Long memberId,
        @Positive @RequestParam(defaultValue = "1") int page,
        @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Pay> myReserveProgramPage = payService.searchMyReserveProgram(memberId, page-1, size);
        List<Pay> payList = myReserveProgramPage.getContent();
        List<PayDto.MyPageProgramResponse> response = payMapper.ReserveProgramToMyPageProgramResponse(payList);


        return new ResponseEntity(
            new MultiResponseDto<>(
                response, myReserveProgramPage), HttpStatus.OK);
    }
}
