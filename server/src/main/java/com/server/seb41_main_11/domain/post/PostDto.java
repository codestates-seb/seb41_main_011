package com.server.seb41_main_11.domain.post;

import lombok.*;

@Getter
public class PostDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserPost {
        private long memberId;
        private String title;
        private String content;
        private String kinds;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CounselorPost {
        private long counselorId;
        private String title;
        private String content;
        private String kinds;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        private long postId;
        private String title;
        private String content;
        private String kinds;

        public void setPostId(long postId) {
            this.postId = postId;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private long postId;
        private long memberId;
        private long counselorId;
        private String title;
        private String content;
        private Post.Kind kinds;
//        private List<Comment> comments;
        private int views;
    }
}
