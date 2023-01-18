package com.server.seb41_main_11.domain.comment.service;

import com.server.seb41_main_11.domain.comment.entity.Comment;
import com.server.seb41_main_11.domain.comment.repository.CommentRepository;
import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.post.entity.Post;
import com.server.seb41_main_11.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    // ----------------- DI ---------------------
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    //    private final CounselorService counselorService;
    private final PostService postService;

    // ----------------- DI ---------------------

    // 댓글 등록
    public Comment create(Comment comment) {

        Member member = memberService.findMemberByMemberId(comment.getMember().getMemberId());
        Post post = postService.find(comment.getPost().getPostId());

        comment.setMember(member);
        comment.setPost(post);
        comment.setWriter(member.getMemberName());

        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment update(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        findComment.update(comment.getContent());

        return commentRepository.save(findComment);
    }

    // 댓글 1건 조회
    @Transactional(readOnly = true)
    public Comment find(long commentId) {
        Comment comment = findVerifiedComment(commentId);
        Post post = comment.getPost();

        return comment;
    }

    // 댓글 삭제
    public void delete(long commentId) {
        commentRepository.deleteById(commentId);
    }

    // 댓글 검증
    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optComment = commentRepository.findById(commentId);

        return optComment.orElseThrow(() -> new EntityNotFoundException("댓글이 없습니다."));
    }
}

