package com.server.seb41_main_11.domain.comment.controller;

import com.server.seb41_main_11.domain.comment.dto.CommentDto;
import com.server.seb41_main_11.domain.comment.mapper.CommentMapper;
import com.server.seb41_main_11.domain.comment.service.CommentService;
import com.server.seb41_main_11.domain.comment.entity.Comment;
import com.server.seb41_main_11.domain.common.MultiResponseDto;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/comments")
@Validated
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post post) {
        Comment comment = commentService.create(mapper.postToEntity(post));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToResponse(comment)), HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                @Valid @RequestBody CommentDto.Patch patch) {
        patch.setCommentId(commentId);

        Comment update = commentService.update(mapper.patchToEntity(patch));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToResponse(update)), HttpStatus.OK);
    }
    
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.find(commentId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.entityToResponse(comment)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllComment(@Positive @RequestParam(defaultValue = "1") int page,
                                 @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Comment> pagecomment = commentService.findAll(page-1, size);
        List<Comment> comments = pagecomment.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.entityToResponses(comments), pagecomment), HttpStatus.OK);
    }
    
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.delete(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
