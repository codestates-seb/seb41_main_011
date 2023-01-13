package com.server.seb41_main_11.domain.post.service;

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
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    // ----------------- DI ---------------------
    private final PostRepository postRepository;
    private final CustomBeanUtils<Post> beanUtils;
    private final MemberService memberService;
    // ----------------- DI ---------------------

    // 글 등록
    public Post createByUser(Post post) {
        Member member = memberService.findMemberByMemberId(post.getMember().getMemberId());
        post.setMember(member);

        return postRepository.save(post);
    }

    // 글 수정
    public Post update(Post post) {
        Post findPost = findVerifiedPost(post.getPostId());

        Post updatedPost = beanUtils.copyNonNullProperties(post, findPost);

        return postRepository.save(updatedPost);
    }

    // 글 1건 조회
    @Transactional(readOnly = true)
    public Post find(long postId) {
        Post post = postRepository.getReferenceById(postId);

        String writer = post.getMember().getMemberName();
        post.setWriter(writer);

        updateViews(postId);

        return post;
    }

    // 글 전체 조회
    @Transactional(readOnly = true)
    public Page<Post> findAll(int page, int size) {
        return postRepository.findAll(PageRequest.of(page, size, Sort.by("postId").descending()));
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
        return optPost.orElseThrow(() -> new EntityNotFoundException("글이 없습니다"));
    }
}
