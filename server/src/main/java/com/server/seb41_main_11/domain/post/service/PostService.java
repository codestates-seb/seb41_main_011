package com.server.seb41_main_11.domain.post.service;

import com.server.seb41_main_11.domain.comment.entity.Comment;
import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.post.entity.Post;
import com.server.seb41_main_11.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    // ----------------- DI ---------------------
    private final PostRepository postRepository;
    private final MemberService memberService;
    // ----------------- DI ---------------------

    // 글 등록
    public Post create(Post post) {
        Member member = memberService.findMemberByMemberId(post.getMember().getMemberId());
        post.setMember(member);
        post.setWriter(post.getMember().getMemberName());

        return postRepository.save(post);
    }

    // 글 수정
    public Post update(Post post) {
        Post findPost = findVerifiedPost(post.getPostId());

        findPost.update(post.getTitle(),post.getContent(),post.getKinds());
        findPost.setComments(post.getComments());

        return postRepository.save(findPost);
    }

    // 글 1건 조회
    @Transactional(readOnly = true)
    public Post find(long postId) {

        Post post = findVerifiedPost(postId);

        List<Comment> comments = post.getComments();

        for(Comment a : comments) {
            a.getContent();
        }

        updateViews(postId);
        post.setCountComments(comments.size());

        return post;
    }

    // 글 전체 조회
    @Transactional(readOnly = true)
    public Page<Post> findAll(int page, int size) {
        Page<Post> postPage = postRepository.findAll(PageRequest.of(page, size, Sort.by("postId").descending()));

        List<Post> postList = postPage.getContent();
        for (Post a : postList) {
            List<Comment> comments = a.getComments();
            Member member = a.getMember();
        }

        return postPage;
    }

    // 글 삭제
    public void delete(long postId) {
        postRepository.deleteById(postId);
    }

    // 조회수 증가 로직
    public void updateViews(Long id) {
        postRepository.updateViews(id);
    }

    // 글 검증
    private Post findVerifiedPost(long postId) {
        Optional<Post> optPost = Optional.of(postRepository.getReferenceById(postId));
        Post findPost = optPost.orElseThrow(() -> new EntityNotFoundException("글이 없습니다"));

        return findPost;
    }
}
