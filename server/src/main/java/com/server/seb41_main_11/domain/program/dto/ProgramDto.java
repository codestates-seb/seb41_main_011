package com.server.seb41_main_11.domain.program.dto;


import com.server.seb41_main_11.domain.pay.dto.PayDto;
import com.server.seb41_main_11.domain.pay.dto.PayDto.MemberInPayList;
import com.server.seb41_main_11.domain.pay.entity.Pay;
import com.server.seb41_main_11.domain.program.entity.Program;
import java.util.List;
import java.util.Set;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ProgramDto {

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {

        @NotBlank
        private String title;

        @NotBlank
        private String content;
        private String image;

        @Min(1)
        private int userMax;

        @NotBlank
        private String dateStart;

        @NotBlank
        private String dateEnd;

        @NotBlank
        private int cost;

        private Set<String> symptomTypes;

        private Long counselorId;

        public static ProgramDto.Post of(ProgramDto.Post requestBody) {
            return Post.builder()
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .image(requestBody.getImage())
                .userMax(requestBody.getUserMax())
                .dateStart(requestBody.getDateStart())
                .dateEnd(requestBody.getDateEnd())
                .cost(requestBody.getCost())
                .symptomTypes(requestBody.getSymptomTypes())
                .counselorId(requestBody.getCounselorId())
                .build();
        }
    }

    @Getter
    @Builder
    public static class Patch {

        @Setter
        private Long programId;

        @NotBlank
        private String title;

        @NotBlank
        private String content;
        private String image;

        @Min(1)
        private int userMax;

        @NotBlank
        private String dateStart;

        @NotBlank
        private String dateEnd;

        @NotBlank
        private int cost;

        private Set<String> symptomTypes;

        @NotBlank
        private Long counselorId;

        public static ProgramDto.Patch of(ProgramDto.Patch requestBody) {
            return ProgramDto.Patch.builder()
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .image(requestBody.getImage())
                .userMax(requestBody.getUserMax())
                .dateStart(requestBody.getDateStart())
                .dateEnd(requestBody.getDateEnd())
                .cost(requestBody.getCost())
                .symptomTypes(requestBody.getSymptomTypes())
                .counselorId(requestBody.getCounselorId())
                .build();
        }
    }

    @Getter
    @Builder
    public static class PatchResponse {
        @Setter
        private Long programId;

        @NotBlank
        private String title;

        @NotBlank
        private String content;
        private String image;

        @Min(1)
        private int userMax;

        @NotBlank
        private String dateStart;

        @NotBlank
        private String dateEnd;

        @NotBlank
        private int cost;

        private Set<String> symptomTypes;

        @NotBlank
        private Long counselorId;

        public static ProgramDto.PatchResponse of(Program program) {
            return PatchResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .content(program.getContent())
                .image(program.getImage())
                .userMax(program.getUserMax())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .cost(program.getCost())
                .symptomTypes(program.getSymptomTypes())
                .counselorId(program.getCounselor().getCounselorId())
                .build();
        }
    }

    @Getter
    @Builder
    public static class PatchCounselor {
        @Setter
        private Long programId;
        private String zoomLink;
        private String announce;

        public static ProgramDto.PatchCounselor of(Program program) {
            return PatchCounselor.builder()
                .zoomLink(program.getZoomLink())
                .announce(program.getAnnounce())
                .build();
        }
    }

    @Getter
    @Builder
    public static class PatchCounselorResponse {
        private String zoomLink;
        private String announce;

        public static ProgramDto.PatchCounselorResponse of(Program program) {
            return PatchCounselorResponse.builder()
                .zoomLink(program.getZoomLink())
                .announce(program.getAnnounce())
                .build();
        }
    }

    @Getter
    @Builder
    public static class GetResponse {

        private Long programId;
        private String title;
        private String content;
        private int userMax;
        private int userCount;
        private int cost;
        private String image;
        private String dateStart;
        private String dateEnd;
        private Set<String> symptomTypes;
        private String counselorName;
        private String profile;
        private String introduce;
        private String expertiseField;


        public static ProgramDto.GetResponse of(Program program) {
            return ProgramDto.GetResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .content(program.getContent())
                .userMax(program.getUserMax())
                .userCount(program.getUserCount())
                .cost(program.getCost())
                .image(program.getImage())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .symptomTypes(program.getSymptomTypes())
                .counselorName(program.getCounselor().getCounselorName())
                .profile(program.getCounselor().getProfile())
                .introduce(program.getCounselor().getIntroduce())
                .expertiseField(program.getCounselor().getExpertiseField())
                .build();
        }
    }

    @Getter
    @Builder
    public static class PageResponse {

        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private Set<String> symptomTypes;
        private String counselorName;

        public static ProgramDto.PageResponse of(Program program) {
            return ProgramDto.PageResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .symptomTypes(program.getSymptomTypes())
                .counselorName(program.getCounselor().getCounselorName())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GetCounselorProgramResponse {
        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private int userCount;
        private String zoomLink;
        private String announce;
        private List<MemberInPayList> memberInPayList;

        public static ProgramDto.GetCounselorProgramResponse of(Program program, List<PayDto.MemberInPayList> memberInPayList) {
            return GetCounselorProgramResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .userMax(program.getUserMax())
                .userCount(program.getUserCount())
                .zoomLink(program.getZoomLink())
                .announce(program.getAnnounce())
                .memberInPayList(memberInPayList)
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GetCounselorProgramsResponse {
        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private int userCount;

        public static ProgramDto.GetCounselorProgramsResponse of(Program program) {
            return GetCounselorProgramsResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .userMax(program.getUserMax())
                .userCount(program.getUserCount())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GetCounselorProgramsByAdminResponse {
        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private int userCount;
        private Long counselorId;
        private String counselorName;

        public static ProgramDto.GetCounselorProgramsByAdminResponse of(Program program) {
            return GetCounselorProgramsByAdminResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .userMax(program.getUserMax())
                .userCount(program.getUserCount())
                .counselorId(program.getCounselor().getCounselorId())
                .counselorName(program.getCounselor().getCounselorName())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GetAdminProgramResponse {

        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private int userCount;

        public static ProgramDto.GetAdminProgramResponse of(Program program) {
            return GetAdminProgramResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .userMax(program.getUserMax())
                .userCount(program.getUserCount())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminPageResponse {
        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private int userCount;

        public static ProgramDto.AdminPageResponse of(Program program) {
            return AdminPageResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .userMax(program.getUserMax())
                .userCount(program.getUserCount())
                .build();
        }
    }
}