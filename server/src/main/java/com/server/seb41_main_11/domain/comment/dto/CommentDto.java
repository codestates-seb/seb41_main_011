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

        public static Post of(Long memberId, Long postId, String content) {
            return new Post(memberId, postId, content);
        }

        public Comment toEntity(Member member, com.server.seb41_main_11.domain.post.entity.Post post) {
            return Comment.of(
                    content,
                    member,
                    post
            );
        }
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

        public static Patch of(Long commentId, String content) {
            return new Patch(commentId, content);
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private long postId;
        private long memberId;
        //        private long counselorId;
        private String content;


        public static Response of(Long commentId, Long postId, Long memberId, String content) {
            return new Response(commentId, postId, memberId, content);
        }

        public static Response from(Comment entity) {
            return new Response(
                    entity.getCommentId(),
                    entity.getPost().getPostId(),
                    entity.getMember().getMemberId(),
                    entity.getContent()
            );
        }
    }
}
