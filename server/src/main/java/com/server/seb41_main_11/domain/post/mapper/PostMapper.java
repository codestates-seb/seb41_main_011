package com.server.seb41_main_11.domain.post.mapper;

import com.server.seb41_main_11.domain.post.dto.PostDto;
import com.server.seb41_main_11.domain.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(source = "kinds", target = "kinds")
    @Mapping(source = "memberId" ,target = "member.memberId")
//    @Mapping(source = "counselorId", target = "counselor.counselorId")
    Post postToEntity(PostDto.Post post);

    @Mapping(source = "kinds", target = "kinds")
    Post patchToEntity(PostDto.Patch patch);

    @Mapping(source = "kinds", target = "kinds")
    @Mapping(source = "member.memberId" ,target = "memberId")
//    @Mapping(source = "counselor.counselorId", target = "counselorId")
    PostDto.Response entityToResponse(Post post);

    List<PostDto.Response> entityToResponses(List<Post> posts);
}
