package com.server.seb41_main_11.domain.counselor.mapper;

import com.server.seb41_main_11.domain.counselor.dto.CounselorDto;
import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CounselorMapper {

    Counselor counselorPostDtoToCounselor(CounselorDto.Post counselorPostDto);

    CounselorDto.Response counselorToCounselorResponse(Counselor counselor);
}
