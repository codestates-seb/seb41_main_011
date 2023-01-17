package com.server.seb41_main_11.domain.counselor.dto;

import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.domain.member.constant.Role;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

public class CounselorDto {
    @Getter
    public static class Post {

        private String profile;
        //프로필 이미지

        private String counselorName;
        //실명

        private String birth;

        private String graduated;
        //학력
        @Email
        private String email;

        private String password;

        private String confirmPassword;

        private String career;

        private String introduce;

    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response {

        private Long counselorId;

        private String profile;
        //프로필 이미지

        private String counselorName;
        //실명

        private String birth;

        private String graduated;
        //학력

        private String email;

        private String password;

        private String career;

        private String introduce;

        private Role role;

        private MemberType memberType;

        private String refreshToken;

        private LocalDateTime tokenExpirationTime;
    }
}
