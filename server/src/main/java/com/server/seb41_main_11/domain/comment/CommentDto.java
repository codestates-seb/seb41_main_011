package com.server.seb41_main_11.domain.comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class CommentDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostToUser {
        private long memberId;
        private long postId;
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostToCounselor {
        private long counselorId;
        private long postId;
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        private long commentId;
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseToUser {
        private long commentId;
        private long memberId;
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseToCounselor {
        private long commentId;
        private long counselorId;
        private String content;
    }
}
