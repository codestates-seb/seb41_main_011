package com.server.seb41_main_11.domain.program.dto;


import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.entity.Program.SymptomTypes;
import java.time.LocalDateTime;
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

        private SymptomTypes symptomTypes;

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
                .build();
        }
    }

    @Getter
    @Setter
    @Builder
    public static class Patch {
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

        private SymptomTypes symptomTypes;

        public void setProgramId(Long programId) {
            this.programId = programId;
        }

        public static ProgramDto.Patch of(Program program) {
            return ProgramDto.Patch.builder()
                .title(program.getTitle())
                .content(program.getContent())
                .image(program.getImage())
                .userMax(program.getUserMax())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .cost(program.getCost())
                .symptomTypes(program.getSymptomTypes())
                .build();
        }
    }

    @Getter
    @Builder
    public static class Response {
        private Long programId;
        private String title;
        private String content;
        private int userMax;
        private int userCount;
        private int cost;
        private String image;
        private String announce;
        private String zoomLink;
        private String dateStart;
        private String dateEnd;
        private SymptomTypes symptomTypes;

        public static ProgramDto.Response of(Program program) {
            return ProgramDto.Response.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .content(program.getContent())
                .userMax(program.getUserMax())
                .userCount(program.getUserCount())
                .cost(program.getCost())
                .image(program.getImage())
                .announce(program.getAnnounce())
                .zoomLink(program.getZoomLink())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .symptomTypes(program.getSymptomTypes())
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
        private SymptomTypes symptomTypes;

        public static ProgramDto.PageResponse of(Program program) {
            return ProgramDto.PageResponse.builder()
                .programId(program.getProgramId())
                .title(program.getTitle())
                .dateStart(program.getDateStart())
                .dateEnd(program.getDateEnd())
                .symptomTypes(program.getSymptomTypes())
                .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CounselorProgramResponse {
        private Long programId;
        private String title;
        private String dateStart;
        private String dateEnd;
        private int userMax;
        private int userCount;

        public static ProgramDto.CounselorProgramResponse of(Program program) {
            return CounselorProgramResponse.builder()
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
