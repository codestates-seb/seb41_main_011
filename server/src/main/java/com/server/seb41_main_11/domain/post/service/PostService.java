package com.server.seb41_main_11.domain.post.service;

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
    public Post create(Post post, Member member) {
        post.setMember(member);

        return postRepository.save(post);
    }

    // 글 수정
    public Post update(Post post) {
        Post findPost = findVerifiedPost(post.getPostId());
        String memberName = findPost.getMember().getMemberName();

        findPost.update(post.getTitle(),post.getContent(),post.getKinds());

        return postRepository.save(findPost);
    }

    // 글 1건 조회
    @Transactional(readOnly = true)
    public Post find(long postId) {

        Post post = findVerifiedPost(postId);
        String memberName = post.getMember().getMemberName();

        updateViews(postId);

        return post;
    }

    // 글 전체 조회
    @Transactional(readOnly = true)
    public Page<Post> findAll(int page, int size) {
        Page<Post> pagePost = postRepository.findAll(PageRequest.of(page, size, Sort.by("postId").descending()));

        List<Post> listPost = pagePost.getContent();

        for (Post a : listPost) {
            a.getMember().getMemberName();
        }

        return pagePost;
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
