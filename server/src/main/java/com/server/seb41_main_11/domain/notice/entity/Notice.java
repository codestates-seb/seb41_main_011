package com.server.seb41_main_11.domain.notice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.seb41_main_11.domain.common.BaseEntity;
import com.server.seb41_main_11.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Notice extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(columnDefinition = "integer default 0" ,nullable = false)
    private int views;

    @Column(length = 30)
    private String writer;

    // ------------------ 연관관계 매핑 ------------------
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @JsonIgnore
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getNotices().contains(this)) {
            this.member.getNotices().add(this);
        }
    }

    // ------------------ Test 를 위한 팩토리 메서드 ------------------
    private Notice(String title, String content, Member member) {
        this.title = title;
        this.content = content;
        this.member = member;
    }

    public static Notice of(String title, String content, Member member) {
        return new Notice(title,content,member);
    }
}
