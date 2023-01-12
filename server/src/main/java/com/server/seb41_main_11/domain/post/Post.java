package com.server.seb41_main_11.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.seb41_main_11.domain.common.BaseEntity;
import com.server.seb41_main_11.domain.member.entity.Member;
import lombok.*;

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

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @JsonIgnore
    private Member member;

//    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Comment> comments = new ArrayList<>();
//
//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name = "COUNSELOR_ID")
//    @JsonIgnore
//    private Counselor counselor;

    public void addMember(Member member) {
        this.member = member;
        if (!this.member.getPosts().contains(this)) {
            this.member.getPosts().add(this);
        }
    }

//   public void addCounselor(Counselor counselor) {
//        this.counselor = counselor;
//        if (!this.counselor.getPosts().contains(this)) {
//            this.counselor.getPosts().add(this);
//        }
//    }
//
//    public void setComment(Comment comment) {
//        this.getComments.add(comment);
//        comment.setPost(this);
//    }

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
