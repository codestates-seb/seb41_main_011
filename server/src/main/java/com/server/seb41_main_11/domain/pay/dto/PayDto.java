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

        public static PayDto.PostResponse of(Pay pay) {
            return PayDto.PostResponse.builder()
                .programId(pay.getProgram().getProgramId())
                .programTitle(pay.getProgram().getTitle())
                .dateStart(pay.getProgram().getDateStart())
                .dateEnd(pay.getProgram().getDateEnd())
                .cost(pay.getProgram().getCost())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GetResponse {
        private Long payId;
        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private String zoomLink;
        private String announce;

        public static PayDto.GetResponse of(Pay pay) {
            return GetResponse.builder()
                .payId(pay.getPayId())
                .programId(pay.getProgram().getProgramId())
                .title(pay.getProgram().getTitle())
                .dateStart(pay.getProgram().getDateStart())
                .dateEnd(pay.getProgram().getDateEnd())
                .userMax(pay.getProgram().getUserMax())
                .zoomLink(pay.getProgram().getZoomLink())
                .announce(pay.getProgram().getAnnounce())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MyPageProgramResponse {
        private Long payId;
        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private LocalDateTime createdAt;

        public static PayDto.MyPageProgramResponse of(Pay pay) {
            return MyPageProgramResponse.builder()
                .payId(pay.getPayId())
                .programId(pay.getProgram().getProgramId())
                .title(pay.getProgram().getTitle())
                .dateStart(pay.getProgram().getDateStart())
                .dateEnd(pay.getProgram().getDateEnd())
                .userMax(pay.getProgram().getUserMax())
                .createdAt(pay.getCreateTime())
                .build();
        }
    }
}
