package com.server.seb41_main_11.domain.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String content;

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

//    public void addMember(Member member) {
//        this.member = member;
//        if (!this.member.getComments().contains(this)) {
//            this.member.getComments().add(this);
//        }
//    }

    public void addPost(Post post) {
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
}
