package com.server.seb41_main_11.global.resolver.memberinfo;

import com.server.seb41_main_11.domain.member.constant.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberInfoDto {

    private Long memberId;
    private Role role;

}