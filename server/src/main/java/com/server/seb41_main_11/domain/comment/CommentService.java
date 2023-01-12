package com.server.seb41_main_11.domain.comment;

import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.post.Post;
import com.server.seb41_main_11.domain.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    private final CustomBeanUtils<Comment> beanUtils;

    // ----------------- DI ---------------------

    // 일반유저 글 등록
    public Comment createToUser(Comment comment) {
        findVerifiedComment(comment.getCommentId());

        Member member = memberService.findMemberByMemberId(comment.getMember().getMemberId());
        Post post = postService.find(comment.getPost().getPostId());

        comment.setMember(member);
        comment.setPost(post);

        return commentRepository.save(comment);
    }

//     // 상담사 글 등록
//    public Comment createToCounselor(Comment comment) {
//        findVerifiedComment(comment.getCommentId());
//
//        Counselor counselor = counselorService.findById(comment.getCounselor().getCounselorId());
//        Post post = postService.find(comment.getPost().getPostId());
//
//        comment.setCounselor(counselor);
//        comment.setPost(post);
//
//        return commentRepository.save(comment);
//    }

    public Comment update(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        Comment updatedComment = beanUtils.copyNonNullProperties(comment, findComment);

        return commentRepository.save(updatedComment);
    }

    @Transactional(readOnly = true)
    public Comment find(long commentId) {
        return findVerifiedComment(commentId);
    }

    @Transactional(readOnly = true)
    public Page<Comment> findAll(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));
    }

    public void delete(long commentId) {
        commentRepository.deleteById(commentId);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optComment = commentRepository.findById(commentId);

        return optComment.orElseThrow(() -> new EntityNotFoundException("댓글이 없습니다."));
    }
}
