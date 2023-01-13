package com.server.seb41_main_11.domain.member.mapper;

import com.server.seb41_main_11.domain.member.dto.MemberDto;
import com.server.seb41_main_11.domain.member.entity.Member;
import org.mapstruct.Mapper;

import javax.persistence.MappedSuperclass;

@Mapper(componentModel = "spring")
public interface MemberMapper {



    MemberDto.Response memberToMemberResponse(Member member);

    Member memberPostDtoToMember(MemberDto.Post memberPostDto);
}
