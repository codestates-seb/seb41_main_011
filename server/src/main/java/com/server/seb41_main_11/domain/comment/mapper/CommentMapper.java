package com.server.seb41_main_11.domain.comment.mapper;

import com.server.seb41_main_11.domain.comment.entity.Comment;
import com.server.seb41_main_11.domain.comment.dto.CommentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "postId", target = "post.postId")
//    @Mapping(source = "counselorId", target = "counselor.counselorId")
    Comment postToEntity(CommentDto.Post post);

    Comment patchToEntity(CommentDto.Patch patch);

    //    @Mapping(source = "counselor.counselorId", target = "counselorId")
    CommentDto.Response entityToResponse(Comment comment);

    List<CommentDto.Response> entityToResponses(List<Comment> comments);
}
