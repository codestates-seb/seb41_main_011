package com.server.seb41_main_11.domain.program.mapper;

import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.entity.Program;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProgramMapper {
    Program ProgramPostDtoToProgram(ProgramDto.Post requestBody);
    Program ProgramPatchDtoToProgram(ProgramDto.Patch requestBody);
    ProgramDto.Response ProgramToProgramResponseDto(Program program);
}
