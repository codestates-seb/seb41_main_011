package com.server.seb41_main_11.domain.comment;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "postId", target = "post.postId")
    Comment postToUser(CommentDto.PostToUser post);

//    @Mapping(source = "counselorId", target = "counselor.counselorId")
//    @Mapping(source = "postId", target = "post.postId")
//    Comment postToCounselor(CommentDto.PostToCounselor post);

    Comment patchToEntity(CommentDto.Patch patch);

    @Mapping(source = "memberId", target = "member.memberId")
    CommentDto.ResponseToUser entityToMemberResponse(Comment comment);
    @Mapping(source = "counselorId", target = "counselor.counselorId")
    CommentDto.ResponseToCounselor entityToCounselorResponse(Comment comment);

    List<CommentDto.ResponseToUser> entitysToUserResponses(List<Comment> comments);
    List<CommentDto.ResponseToCounselor> entitysToCounselorResponses(List<Comment> comments);
}
