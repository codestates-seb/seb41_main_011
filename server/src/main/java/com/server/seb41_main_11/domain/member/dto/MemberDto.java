package com.server.seb41_main_11.domain.member.dto;

import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.domain.member.constant.Role;
import lombok.*;

import javax.validation.constraints.NotBlank;


public class MemberDto {

    @Getter
    public static class Post{

        private String email;

        private String memberName;

        private String password;

        private String confirmPassword;

        private String nickName;

        private String birth;

    }

    @Getter
    public static class Login{

    }
    @Getter
    @AllArgsConstructor
    public static class Patch{

    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private Long memberId;
        private String email;
        private String password;

        private String memberName;
        private String nickName;
        private String birth;

        private Role role;

        private MemberType memberType;

    }
}
