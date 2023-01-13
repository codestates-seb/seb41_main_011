package com.server.seb41_main_11.domain.post.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.seb41_main_11.domain.comment.entity.Comment;
import com.server.seb41_main_11.domain.common.BaseEntity;
import com.server.seb41_main_11.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @Column(length = 30)
    private String writer;

    // ------------------ 연관관계 매핑 ------------------
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @JsonIgnore
    private Member member;

    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();
//
//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name = "COUNSELOR_ID")
//    @JsonIgnore
//    private Counselor counselor;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getPosts().contains(this)) {
            this.member.getPosts().add(this);
        }
    }

//   public void setCounselor(Counselor counselor) {
//        this.counselor = counselor;
//        if (!this.counselor.getPosts().contains(this)) {
//            this.counselor.getPosts().add(this);
//        }
//    }
//
    public void setComment(Comment comment) {
        this.getComments().add(comment);
        comment.setPost(this);
    }

    // ------------------ Test 를 위한 팩토리 메서드 ------------------
    private Post(String title, String content, Kind kinds, Member member) {
        this.title = title;
        this.content = content;
        this.kinds = kinds;
        this.member = member;
    }

    public static Post of(String title, String content, Kind kinds, Member member) {
        return new Post(title,content,kinds,member);
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
