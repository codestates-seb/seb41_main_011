package com.server.seb41_main_11.domain.post.mapper;

import com.server.seb41_main_11.domain.post.dto.PostDto;
import com.server.seb41_main_11.domain.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    Post postToEntity(PostDto.Post post);

    Post patchToEntity(PostDto.Patch patch);

    // 생성, 단건조회
    default PostDto.SingleResponse entityToSingleResponse(Post post) {
        return PostDto.SingleResponse.of(post);
    }

    // 전체 조회
    default List<PostDto.MultiResponse> entityToMultiResponse(List<Post> posts) {
        List<PostDto.MultiResponse> list = new ArrayList<PostDto.MultiResponse>(posts.size());

        for (Post a : posts) {
            list.add(PostDto.MultiResponse.of(a));
        }

        return list;
    }
}
