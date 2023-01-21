package com.server.seb41_main_11.domain.notice.dto;

import com.server.seb41_main_11.domain.notice.entity.Notice;
import lombok.*;

import java.time.LocalDateTime;

public class NoticeDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private String title;
        private String content;
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
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SingleResponse {
        private long noticeId;
        private String title;
        private String content;
        private int views;
        private String writer;
        private LocalDateTime createdTime;

        public static SingleResponse of(Notice notice) {
            return SingleResponse.builder()
                    .noticeId(notice.getNoticeId())
                    .title(notice.getTitle())
                    .content(notice.getContent())
                    .views(notice.getViews())
                    .writer(notice.getMember().getMemberName())
                    .createdTime(notice.getCreateTime())
                    .build();
        }
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MultiResponse {
        private long noticeId;
        private String title;
        private int views;
        private String writer;
        private LocalDateTime createdTime;

        public static MultiResponse of(Notice notice) {
            return MultiResponse.builder()
                    .noticeId(notice.getNoticeId())
                    .title(notice.getTitle())
                    .views(notice.getViews())
                    .writer(notice.getMember().getMemberName())
                    .createdTime(notice.getCreateTime())
                    .build();
        }
    }
}
