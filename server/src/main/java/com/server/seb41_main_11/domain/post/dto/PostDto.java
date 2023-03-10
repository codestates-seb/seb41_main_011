package com.server.seb41_main_11.domain.post.dto;

import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.domain.post.entity.Post;
import lombok.*;

import java.time.LocalDateTime;

public class PostDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private String title;
        private String content;
        private Role role;
        private com.server.seb41_main_11.domain.post.entity.Post.Kind kinds;
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
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SingleResponse {
        private long postId;
        private String title;
        private String content;
        private com.server.seb41_main_11.domain.post.entity.Post.Kind kinds;
        private int views;
        private String writer;
        private LocalDateTime createdTime;

        public static SingleResponse ofMember(com.server.seb41_main_11.domain.post.entity.Post post) {
            return SingleResponse.builder()
                    .postId(post.getPostId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .kinds(post.getKinds())
                    .views(post.getViews())
                    .writer(post.getMember().getNickName()) // 닉네임
                    .createdTime(post.getCreateTime())
                    .build();
        }
      
        public static SingleResponse ofCounselor(com.server.seb41_main_11.domain.post.entity.Post post) {
            return SingleResponse.builder()
                    .postId(post.getPostId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .kinds(post.getKinds())
                    .views(post.getViews())
                    .writer(post.getCounselor().getCounselorName())
                    .createdTime(post.getCreateTime())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MultiResponse {
        private long postId;
        private String title;
        private com.server.seb41_main_11.domain.post.entity.Post.Kind kinds;
        private int views;
        private String writer;
        private LocalDateTime createdTime;

        public static MultiResponse of(com.server.seb41_main_11.domain.post.entity.Post post) {
            return MultiResponse.builder()
                    .postId(post.getPostId())
                    .title(post.getTitle())
                    .kinds(post.getKinds())
                    .views(post.getViews())
                    .writer(post.getMember().getNickName())
                    .createdTime(post.getCreateTime())
                    .build();
        }
    }
}
