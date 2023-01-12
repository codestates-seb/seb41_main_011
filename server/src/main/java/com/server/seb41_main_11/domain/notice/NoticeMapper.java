package com.server.seb41_main_11.domain.notice;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoticeMapper {

//    @Mapping(source = "memberId", target = "member.memberId")
    Notice postToEntity(NoticeDto.Post post);

    Notice patchToEntity(NoticeDto.Patch patch);

//    @Mapping(source = "member.memberId", target = "memberId")
    NoticeDto.Response entityToResponse(Notice notice);

    List<NoticeDto.Response> entityToResponses(List<Notice> notices);
}
