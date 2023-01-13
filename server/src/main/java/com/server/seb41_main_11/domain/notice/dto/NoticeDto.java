package com.server.seb41_main_11.domain.notice.dto;

import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.notice.entity.Notice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class NoticeDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private long memberId;
        private String title;
        private String content;

        public static Post of(Long memberId, String title, String content) {
            return new Post(memberId,title,content);
        }

        public Notice toEntity(Member member) {
            return Notice.of(
                    title,
                    content,
                    member
            );
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        private long noticeId;
        private String title;
        private String content;

        public void setNoticeId(long noticeId) {
            this.noticeId = noticeId;
        }

        public static Patch of(Long noticeId, String title, String content) {
            return new Patch(noticeId,title,content);
        }
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long noticeId;
        private long memberId;
        private String title;
        private String content;
        private int views;
        private String writer;

        public static Response of(long noticeId, long memberId, String title, String content, int views, String writer) {
            return new Response(noticeId,memberId,title,content,views,writer);
        }

        public static Response from(Notice entity) {
            return new Response(
            entity.getNoticeId(),
            entity.getMember().getMemberId(),
            entity.getTitle(),
            entity.getContent(),
            entity.getViews(),
            entity.getWriter());
        }
    }
}
