package com.server.seb41_main_11.domain.notice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.seb41_main_11.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(columnDefinition = "integer default 0" ,nullable = false)
    private int views;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @JsonIgnore
    private Member member;

    public void addMember(Member member) {
        this.member = member;
        if (!this.member.getNotices().contains(this)) {
            this.member.getNotices().add(this);
        }
    }
}
