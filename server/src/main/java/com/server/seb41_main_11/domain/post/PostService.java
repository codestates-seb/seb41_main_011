package com.server.seb41_main_11.domain.post;

import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
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

    private final PostRepository postRepository;
    private final CustomBeanUtils<Post> beanUtils;
    private final MemberService memberService;

    // 일반 유저가 글 동록
    public Post createByUser(Post post) {
        Member member = memberService.findMemberByMemberId(post.getMember().getMemberId());
        post.setMember(member);

        return postRepository.save(post);
    }

    public Post update(Post post) {
        Post findPost = findVerifiedPost(post.getPostId());

        Post updatedPost = beanUtils.copyNonNullProperties(post, findPost);

        return postRepository.save(updatedPost);
    }

    @Transactional(readOnly = true)
    public Post find(long postId) {
        Post post = postRepository.getReferenceById(postId);
        updateViews(postId);

        return post;
    }

    @Transactional(readOnly = true)
    public Page<Post> findAll(int page, int size) {
        return postRepository.findAll(PageRequest.of(page, size, Sort.by("postId").descending()));
    }

    public void delete(long postId) {
        postRepository.deleteById(postId);
    }

    // 조회수 증가 로직
    public void updateViews(Long id) {
        postRepository.updateViews(id);
    }

    private Post findVerifiedPost(long postId) {
        Optional<Post> optPost = Optional.of(postRepository.getReferenceById(postId));
        return optPost.orElseThrow(() -> new EntityNotFoundException("글이 없습니다"));
    }
}
