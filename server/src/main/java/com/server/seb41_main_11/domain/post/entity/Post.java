package com.server.seb41_main_11.domain.post.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.seb41_main_11.domain.common.BaseEntity;
import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Getter @Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Post extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(columnDefinition = "integer default 0" ,nullable = false)
    private int views;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Kind kinds;

    // ------------------ 연관관계 매핑 ------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @JsonIgnore
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COUNSELOR_ID")
    @JsonIgnore
    private Counselor counselor;

    public void setMember(Member member) {
        this.member = member;
    }

    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }


    public void update(String title, String content, Kind kinds) {
        this.title = title;
        this.content = content;
        this.kinds = kinds;
    }

    // ------------------ Enum ------------------

    public enum Kind {
        GENERAL("일반"),
        REVIEW("후기");

        @Getter
        private String status;

        Kind(String status) {
            this.status = status;
        }
    }
}