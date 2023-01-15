package com.server.seb41_main_11.domain.comment.dto;

import com.server.seb41_main_11.domain.comment.entity.Comment;
import com.server.seb41_main_11.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CommentDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private long memberId;
        //        private long counselorId;
        private long postId;
        private String content;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        private long commentId;
        private String content;

        public void setCommentId(long commentId) {
            this.commentId = commentId;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private String writer;
        //        private long counselorId;
        private String content;
    }
}
