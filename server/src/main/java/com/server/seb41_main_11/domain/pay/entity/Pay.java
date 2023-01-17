package com.server.seb41_main_11.domain.pay.entity;

import com.server.seb41_main_11.domain.common.BaseEntity;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.program.entity.Program;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Pay extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payId;

    @Column(nullable = false)
    private String cardOwner;

    @Column(length = 16, nullable = false)
    private String cardNum;

    @Column(length = 3, nullable = false)
    private String cvvNum;

    @Column(nullable = false)
    private String expirationTime;

    private Status status;

    @ManyToOne(optional = false)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "PROGRAM_ID")
    private Program program;

    public void setProgram(Program program) {
        this.program = program;
    }

    public enum Status {
        COMPLETE_PAYMENT("결제 완료"),
        WAITING_FOR_PAYMENT("결제 대기중"),
        CANCEL_PAYMENT("결제 취소");

        private String message;

        Status(String message) {
            this.message = message;
        }
    }

    @Builder
    public Pay(Long payId, String cardOwner, String cardNum, String cvvNum, String expirationTime,
        Status status, Member member, Program program) {
        this.payId = payId;
        this.cardOwner = cardOwner;
        this.cardNum = cardNum;
        this.cvvNum = cvvNum;
        this.expirationTime = expirationTime;
        this.status = status;
        this.member = member;
        this.program = program;
    }

    public static Pay of(Pay pay) {
        return Pay.builder()
            .payId(pay.getPayId())
            .cardOwner(pay.getCardOwner())
            .cardNum(pay.getCardNum())
            .cvvNum(pay.getCvvNum())
            .expirationTime(pay.getExpirationTime())
            .status(pay.getStatus())
            .member(pay.getMember())
            .program(pay.getProgram())
            .build();
    }
}
