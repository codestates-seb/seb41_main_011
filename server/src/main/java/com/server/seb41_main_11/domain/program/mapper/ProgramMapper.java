package com.server.seb41_main_11.domain.program.mapper;

import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.pay.dto.PayDto;
import com.server.seb41_main_11.domain.pay.dto.PayDto.MemberInPayList;
import com.server.seb41_main_11.domain.pay.entity.Pay;
import com.server.seb41_main_11.domain.pay.entity.Pay.Status;
import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.dto.ProgramDto.GetCounselorProgramResponse;
import com.server.seb41_main_11.domain.program.entity.Program;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProgramMapper {
    Program ProgramPostDtoToProgram(ProgramDto.Post requestBody);
    Program ProgramPatchDtoToProgram(ProgramDto.Patch requestBody);

    default ProgramDto.PatchResponse ProgramToPatchProgramResponseDto(Program program) {
        ProgramDto.PatchResponse response = ProgramDto.PatchResponse.of(program);
        return response;
    }

    Program PatchCounselorDtoToProgram(ProgramDto.PatchCounselor requestBody);
    ProgramDto.PatchCounselorResponse ProgramToPatchCounselorResponse(Program program);

    default ProgramDto.GetResponse ProgramToGetProgramResponseDto(Program program) {
        ProgramDto.GetResponse response = ProgramDto.GetResponse.of(program);
        return response;
    }
    default List<ProgramDto.PageResponse> ProgramsToProgramResponseDtos(List<Program> programs) {
        List<ProgramDto.PageResponse> list = new ArrayList<ProgramDto.PageResponse>(programs.size());

        for(Program program : programs) {
            list.add(ProgramDto.PageResponse.of(program));
        }
        return list;
    }

    default ProgramDto.GetCounselorProgramResponse ProgramToGetCounselorProgramResponseDto(Program program) {
        List<PayDto.MemberInPayList> member = new ArrayList<>();
        List<Pay> payList = program.getPayList();
        for (Pay pay : payList) {
            if (pay.getStatus().equals(Status.COMPLETE_PAYMENT)) {
                member.add(MemberInPayList.of(pay));
            }
        }

        ProgramDto.GetCounselorProgramResponse response = ProgramDto.GetCounselorProgramResponse.of(program, member);
        return response;
    }
    List<ProgramDto.GetCounselorProgramsResponse> ProgramsToGetCounselorProgramsResponseDtos(List<Program> programs);

    default List<ProgramDto.GetCounselorProgramsByAdminResponse> ProgramsToGetCounselorProgramsByAdminResponseDtos(List<Program> programs) {
        List<ProgramDto.GetCounselorProgramsByAdminResponse> list = new ArrayList<>(programs.size());

        for(Program program : programs) {
            list.add(ProgramDto.GetCounselorProgramsByAdminResponse.of(program));
        }
        return list;
    }
    default List<ProgramDto.GetAdminProgramResponse> ProgramsToGetAdminProgramResponseDtos(List<Program> programs) {
        List<ProgramDto.GetAdminProgramResponse> list = new ArrayList<>(programs.size());

        for (Program program : programs) {
            list.add(ProgramDto.GetAdminProgramResponse.of(program));
        }
        return list;
    }

}
