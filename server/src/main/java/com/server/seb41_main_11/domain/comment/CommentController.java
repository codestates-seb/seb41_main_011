package com.server.seb41_main_11.domain.comment;

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
    public ResponseEntity postC0ommentToUser(@Valid @RequestBody CommentDto.PostToUser post) {
        Comment comment = commentService.createToUser(mapper.postToUser(post));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToMemberResponse(comment)), HttpStatus.CREATED);
    }

//    // 상담사 글 등록
//    @PostMapping
//    public ResponseEntity postCommentToCounselor(@Valid @RequestBody CommentDto.PostToCounselor post) {
//        Comment comment = commentService.createToUser(mapper.postToCounselor(post));
//
//        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToCounselorResponse(comment)), HttpStatus.CREATED);
//    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                @Valid @RequestBody CommentDto.Patch patch) {
        patch.setCommentId(commentId);

        Comment update = commentService.update(mapper.patchToEntity(patch));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToMemberResponse(update)), HttpStatus.OK);
    }
    
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.find(commentId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.entityToMemberResponse(comment)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllComment(@Positive @RequestParam(defaultValue = "1") int page,
                                 @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Comment> pagecomment = commentService.findAll(page-1, size);
        List<Comment> comments = pagecomment.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.entitysToUserResponses(comments), pagecomment), HttpStatus.OK);
    }
    
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.delete(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
