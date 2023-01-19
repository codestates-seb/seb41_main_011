package com.server.seb41_main_11.domain.pay.dto;

import com.server.seb41_main_11.domain.pay.entity.Pay;
import java.time.LocalDateTime;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PayDto {
    @Getter
    @Builder
    public static class Post {
        @NotBlank
        private String cardOwner;

        @NotBlank
        private String cardNum;

        @NotBlank
        private String cvvNum;

        @NotBlank
        @Pattern(regexp = "^(0[1-9]|1[0-2])([\\/])([1-9][0-9])$", message = "월/년 순서로 입력하셔야 합니다.")
        private String expirationTime;

        public static PayDto.Post of(PayDto.Post requestBody) {
            return PayDto.Post.builder()
                .cardOwner(requestBody.getCardOwner())
                .cardNum(requestBody.getCardNum())
                .cvvNum(requestBody.getCvvNum())
                .expirationTime(requestBody.getExpirationTime())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostResponse {
        private Long programId;
        private String programTitle;
        private String dateStart;
        private String dateEnd;
        private int cost;
        private String counselorName;
        private String status;

        public static PayDto.PostResponse of(Pay pay) {
            return PayDto.PostResponse.builder()
                .programId(pay.getProgram().getProgramId())
                .programTitle(pay.getProgram().getTitle())
                .dateStart(pay.getProgram().getDateStart())
                .dateEnd(pay.getProgram().getDateEnd())
                .cost(pay.getProgram().getCost())
                .counselorName(pay.getProgram().getCounselor().getCounselorName())
                .status(pay.getStatus().getStatusMessage())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PayPatchResponse {
        private String status;

        public static PayDto.PayPatchResponse of(Pay pay) {
            return PayPatchResponse.builder()
                .status(pay.getStatus().getStatusMessage())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GetResponse {
        private Long payId;
        private LocalDateTime createdAt;
        private String status;
        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private int cost;
        private String zoomLink;
        private String announce;
        private String counselorName;

        public static PayDto.GetResponse of(Pay pay) {
            return GetResponse.builder()
                .payId(pay.getPayId())
                .createdAt(pay.getCreateTime())
                .status(pay.getStatus().getStatusMessage())
                .programId(pay.getProgram().getProgramId())
                .title(pay.getProgram().getTitle())
                .dateStart(pay.getProgram().getDateStart())
                .dateEnd(pay.getProgram().getDateEnd())
                .userMax(pay.getProgram().getUserMax())
                .cost(pay.getProgram().getCost())
                .zoomLink(pay.getProgram().getZoomLink())
                .announce(pay.getProgram().getAnnounce())
                .counselorName(pay.getProgram().getCounselor().getCounselorName())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserReservePageResponse {
        private Long payId;
        private Long memberId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private LocalDateTime createdAt;
        private String counselorName;

        public static PayDto.UserReservePageResponse of(Pay pay) {
            return UserReservePageResponse.builder()
                .payId(pay.getPayId())
                .memberId(pay.getMember().getMemberId())
                .title(pay.getProgram().getTitle())
                .dateStart(pay.getProgram().getDateStart())
                .dateEnd(pay.getProgram().getDateEnd())
                .userMax(pay.getProgram().getUserMax())
                .createdAt(pay.getCreateTime())
                .counselorName(pay.getProgram().getCounselor().getCounselorName())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminReservePageResponse {
        private Long payId;
        private Long memberId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private String counselorName;

        public static PayDto.AdminReservePageResponse of(Pay pay) {
            return AdminReservePageResponse.builder()
                .payId(pay.getPayId())
                .memberId(pay.getMember().getMemberId())
                .title(pay.getProgram().getTitle())
                .dateStart(pay.getProgram().getDateStart())
                .dateEnd(pay.getProgram().getDateEnd())
                .userMax(pay.getProgram().getUserMax())
                .counselorName(pay.getProgram().getCounselor().getCounselorName())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberInPayList {
        private String nickName;
        private String birth;

        public static PayDto.MemberInPayList of(Pay pay) {
            return MemberInPayList.builder()
                .nickName(pay.getMember().getNickName())
                .birth(pay.getMember().getBirth())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminPayStatusPageResponse{
        private long memberId;

        private String memberName;

        private long payId;

        private String status;

        private String title;

        private int cost;

        public static PayDto.AdminPayStatusPageResponse of(Pay pay){
            return AdminPayStatusPageResponse.builder()
                    .memberId(pay.getMember().getMemberId())
                    .memberName(pay.getMember().getMemberName())
                    .payId(pay.getPayId())
                    .status(pay.getStatus().getStatusMessage())
                    .title(pay.getProgram().getTitle())
                    .cost(pay.getProgram().getCost())
                    .build();
        }
    }
}
