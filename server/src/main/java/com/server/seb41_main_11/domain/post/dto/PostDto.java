package com.server.seb41_main_11.domain.post.dto;

import com.server.seb41_main_11.domain.comment.dto.CommentDto;
import lombok.*;
import java.util.List;

public class PostDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private long memberId;
        //        private long counselorId;
        private String title;
        private String content;
        private String kinds;
    }

    @Getter
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

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private long postId;
        private long memberId;
        //        private long counselorId;
        private String title;
        private String content;
        private String kinds;
        private List<CommentDto.Response> comments;
        private int views;
        private String writer;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResponseExcludeComments {
        private long postId;
        private long memberId;
        //        private long counselorId;
        private String title;
        private String content;
        private String kinds;
        private int views;
        private String writer;
        private int countComments;
    }
}
