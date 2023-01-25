package com.server.seb41_main_11.domain.post.service;

import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.member.constant.Status;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.post.entity.Post;
import com.server.seb41_main_11.domain.post.repository.PostRepository;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.server.seb41_main_11.domain.member.constant.Status.DELETE;


@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    // ----------------- DI ---------------------
    private final PostRepository postRepository;
    // ----------------- DI ---------------------

    // 멤버 글 등록
    public Post createByMember(Post post, Member member) {

        post.setMember(member);
        return postRepository.save(post);
    }

    // 상담사 글 등록
    public Post createByCounselor(Post post, Counselor counselor) {

        post.setCounselor(counselor);
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

        Pageable pageable = PageRequest.of(page, size, Sort.by("postId").descending());

        Page<Post> pagePost = postRepository.findAll(pageable);

        List<Post> listPost = pagePost.getContent();

        for (Post a : listPost) {
            if (Objects.equals(a.getMember().getStatus(), DELETE)) {
                a.setTitle("탈퇴한 회원의 글입니다." + a.getTitle());
                a.getMember().setMemberName("탈퇴한 회원" + a.getMember().getMemberName());
            }
        }

        return pagePost;
    }

    // 글 삭제
    public void delete(long postId) {
        postRepository.deleteById(postId);
    }

    // 조회수 증가 로직
    public void updateViews(Long id) {
        Post post = findVerifiedPost(id);

        int findViews = post.getViews() + 1;

        post.setViews(findViews);

        postRepository.save(post);
    }

    // 글 검증
    private Post findVerifiedPost(long postId) {
        Optional<Post> optPost = Optional.of(postRepository.getReferenceById(postId));
        Post findPost = optPost.orElseThrow(() -> new EntityNotFoundException("글이 없습니다"));

        return findPost;
    }
}
