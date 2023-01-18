package com.server.seb41_main_11.domain.notice.mapper;

import com.server.seb41_main_11.domain.notice.dto.NoticeDto;
import com.server.seb41_main_11.domain.notice.entity.Notice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface NoticeMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Notice postToEntity(NoticeDto.Post post);

    Notice patchToEntity(NoticeDto.Patch patch);

    default NoticeDto.SingleResponse entityToSingleResponse(Notice notice) {
        return NoticeDto.SingleResponse.of(notice);
    }

    default List<NoticeDto.MultiResponse> entityToMultiResponse(List<Notice> notices) {
        List<NoticeDto.MultiResponse> list = new ArrayList<NoticeDto.MultiResponse>(notices.size());

        for (Notice a : notices) {
            list.add(NoticeDto.MultiResponse.of(a));
        }

        return list;
    }


}