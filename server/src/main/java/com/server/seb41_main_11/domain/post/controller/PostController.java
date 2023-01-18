package com.server.seb41_main_11.domain.post.controller;

import com.server.seb41_main_11.domain.common.MultiResponseDto;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.post.dto.PostDto;
import com.server.seb41_main_11.domain.post.mapper.PostMapper;
import com.server.seb41_main_11.domain.post.service.PostService;
import com.server.seb41_main_11.domain.post.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@Validated
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final MemberService memberService;
    private final PostMapper mapper;

    // 일반 유저가 글 등록
    @PostMapping("/post")
    public ResponseEntity createPost(@Valid @RequestBody PostDto.Post post,
                                     HttpServletRequest request) {
        Post findPost = postService.create(mapper.postToEntity(post), memberService.getLoginMember(request));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToSingleResponse(findPost)), HttpStatus.CREATED);
    }

    @PatchMapping("/patch/{post-id}")
    public ResponseEntity updatePost(@PathVariable("post-id") @Positive long postId,
                                     @Valid @RequestBody PostDto.Patch patch) {
        patch.setPostId(postId);

        Post update = postService.update(mapper.patchToEntity(patch));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToSingleResponse(update)), HttpStatus.OK);
    }

    @GetMapping("/lookup/{post-id}")
    public ResponseEntity findPost(@PathVariable("post-id") @Positive long postId) {
        Post findPost = postService.find(postId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.entityToSingleResponse(findPost)), HttpStatus.OK);
    }

    @GetMapping("/lookup/list")
    public ResponseEntity findAllByPostId(@Positive @RequestParam(defaultValue = "1") int page,
                                          @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Post> pagePost = postService.findAll(page-1, size);
        List<Post> posts = pagePost.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.entityToMultiResponse(posts), pagePost), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive long postId) {
        postService.delete(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}