package com.server.seb41_main_11.domain.pay.service;

import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.pay.entity.Pay;
import com.server.seb41_main_11.domain.pay.entity.Pay.Status;
import com.server.seb41_main_11.domain.pay.repository.PayRepository;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.service.ProgramService;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import java.util.List;
import java.util.Optional;

import com.server.seb41_main_11.global.error.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PayService {
    private final PayRepository payRepository;
    private final ProgramService programService;

    public Pay createPay(Pay pay, Long programId, Member member) {
        Program program = programService.findVerifiedExistsReserveProgram(
                member.getMemberId(), programId);

        // 결제 시 프로그램 참여자 수 증가
        if (program.getUserCount() >= program.getUserMax()) {
            throw new BusinessException(ErrorCode.PROGRAM_CAPACITY_EXCEEDED);
        } else {
            int findUserCount = program.getUserCount() + 1;
            program.setUserCount(findUserCount);
        }

        createPayStatusSave(pay);

        pay.setMember(member);
        pay.setProgram(program);


        return payRepository.save(pay);
    }

    @Transactional(readOnly = true)
    public Pay findReservation(Long payId) {
        Pay findPay = findVerifiedPay(payId);
        return findPay;
    }

    public Pay findVerifiedPay(Long payId) {
        Optional<Pay> optionalPay = payRepository.findById(payId);
        Pay findPay = optionalPay.orElseThrow(
                () -> new BusinessException(ErrorCode.RESERVATION_NOT_FOUND)
        );

        return findPay;
    }

    @Transactional(readOnly = true)
    public Page<Pay> searchUserReserveProgram(Long memberId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("pay_id").descending());

        Page<Pay> payPage = payRepository.findAllByMember(memberId, pageable);

        return payPage;
    }

    public Pay createPayStatusSave(Pay pay) {
        pay.setStatus(Status.COMPLETE_PAYMENT);
        return pay;
    }


    /**
     * 결제 상태별 조회
     */
    public Page<Pay> searchCompletePayment(int page, int size, String status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("pay_id").descending());

        if (Status.COMPLETE_PAYMENT.equals(Status.valueOf(status))) {
            Page<Pay> pays = payRepository.findAllByStatus(status, pageable);
            return pays;
        } else if (Status.WAITING_CANCEL_PAYMENT.equals(Status.valueOf(status))) {
            Page<Pay> pays = payRepository.findAllByStatus(status, pageable);
            return pays;
        } else if (Status.CANCEL_PAYMENT.equals(Status.valueOf(status))) {
            Page<Pay> pays = payRepository.findAllByStatus(status, pageable);
            return pays;
        } else {
            throw new EntityNotFoundException(ErrorCode.STATUS_NOT_FOUND);
        }
    }

    /**
     * 결제 상태 변경 : 결제 완료 -> 결제 취소 요청
     * */
    public Pay updatePayStatus(Long payId) {
        Pay pay = findVerifiedPay(payId);
        pay.setStatus(Status.WAITING_CANCEL_PAYMENT);

        return payRepository.save(pay);
    }

    /**
     * 결제 상태 변경 : 결제 취소 요청 -> 결제 취소
     */
    public Pay confirmPayStatus(Long payId){
        Pay pay = findVerifiedPay(payId);
        pay.setStatus(Status.CANCEL_PAYMENT);

        Program program = programService.findProgram(pay.getProgram().getProgramId());

        if(program.getUserCount() > 0) {
            int user = program.getUserCount() - 1;
            program.setUserCount(user);
        }

        return payRepository.save(pay);
    }
}
