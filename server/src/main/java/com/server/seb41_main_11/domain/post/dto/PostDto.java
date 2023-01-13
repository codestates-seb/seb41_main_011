package com.server.seb41_main_11.domain.post.dto;

import com.server.seb41_main_11.domain.comment.dto.CommentDto;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

public class PostDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private long memberId;
//        private long counselorId;
        private String title;
        private String content;
        private com.server.seb41_main_11.domain.post.entity.Post.Kind kinds;

        public static Post of(Long memberId, String title, String content, com.server.seb41_main_11.domain.post.entity.Post.Kind kinds) {
            return new Post(memberId, title, content, kinds);
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        private long postId;
        private String title;
        private String content;
        private com.server.seb41_main_11.domain.post.entity.Post.Kind kinds;

        public void setPostId(long postId) {
            this.postId = postId;
        }

        public static Patch of(Long postId, String title, String content, com.server.seb41_main_11.domain.post.entity.Post.Kind kinds) {
            return new Patch(postId,title,content,kinds);
        }
    }

    @Getter @Setter
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

        public static Response of(Long postId, Long memberId, String title, String content, String kinds, List<CommentDto.Response> comments, int views, String writer) {
            return new Response(postId,memberId,title,content,kinds,comments,views,writer);
        }

        public static Response from(com.server.seb41_main_11.domain.post.entity.Post entity) {
            return new Response(
                    entity.getPostId(),
                    entity.getMember().getMemberId(),
                    entity.getTitle(),
                    entity.getContent(),
                    entity.getKinds().toString(),
                    entity.getComments().stream()
                            .map(CommentDto.Response::from)
                            .collect(Collectors.toList()),
                    entity.getViews(),
                    entity.getWriter());
        }
    }
}
