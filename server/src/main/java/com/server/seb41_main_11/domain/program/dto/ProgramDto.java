package com.server.seb41_main_11.domain.program.dto;


import com.server.seb41_main_11.domain.program.entity.Program;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

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

        public static ProgramDto.Post of(ProgramDto.Post requestBody) {
            return Post.builder()
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .image(requestBody.getImage())
                .userMax(requestBody.getUserMax())
                .dateStart(requestBody.getDateStart())
                .dateEnd(requestBody.getDateEnd())
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
                .build();
        }
    }
}
