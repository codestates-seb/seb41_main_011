package com.server.seb41_main_11.domain.comment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String writer;

    // ------------------ 연관관계 매핑 ------------------
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @JsonIgnore
    private Member member;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    @JsonIgnore
    private Post post;

//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name = "COUNSELOR_ID")
//    @JsonIgnore
//    private Counselor counselor;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getComments().contains(this)) {
            this.member.getComments().add(this);
        }
    }

    public void setPost(Post post) {
        this.post = post;
        if (!this.post.getComments().contains(this)) {
            this.post.getComments().add(this);
        }
    }

//    public void AddCounselor(Counselor counselor) {
//        this.counselor = counselor;
//        if (!this.counselor.getComments().contains(this)) {
//            this.counselor.getComments().add(this);
//        }
//    }

    public void update(String content) {
        this.content = content;
    }

    // ------------------ Test 를 위한 팩토리 메서드 ------------------

    private Comment(String content, Member member, Post post) {
        this.content = content;
        this.member = member;
        this.post = post;
    }

    public static Comment of(String content, Member member, Post post) {
        return new Comment(content,member,post);
    }
}
