package com.server.seb41_main_11.domain.program.mapper;

import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.entity.Program;
import java.util.ArrayList;
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
    List<ProgramDto.GetCounselorProgramResponse> ProgramsToGetCounselorProgramResponseDtos(List<Program> programs);
    List<ProgramDto.GetAdminProgramResponse> ProgramsToGetAdminProgramResponseDtos(List<Program> programs);
}
