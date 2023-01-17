package com.server.seb41_main_11.domain.counselor.mapper;

import com.server.seb41_main_11.domain.counselor.dto.CounselorDto;
import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CounselorMapper {

    Counselor counselorPostDtoToCounselor(CounselorDto.Post counselorPostDto);

    CounselorDto.Response counselorToCounselorResponse(Counselor counselor);

    Counselor counselorLoginDtoToCounselor(CounselorDto.Login counselorLogindto);

    CounselorDto.MyPageResponse counselorToMyPageResponse(Counselor counselor);

    @Mapping(source = "newPassword", target = "password")
    Counselor counselorPatchDtoToCounselor(CounselorDto.Patch counselorPatchDto);

    List<CounselorDto.MyPageResponse> counselorsToCounselorMyPageResponses(List<Counselor> counselors);
}
