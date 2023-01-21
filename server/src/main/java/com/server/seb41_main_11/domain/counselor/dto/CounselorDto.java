package com.server.seb41_main_11.domain.counselor.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.global.jwt.dto.JwtTokenDto;
import lombok.*;

import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.Date;

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

        private String expertiseField;
        @Email
        private String email;

        private String password;

        private String confirmPassword;

        private String career;

        private String introduce;

    }

    @Getter
    public static class Login {
        private String email;
        private String password;
    }

    @Getter
    @NoArgsConstructor
    public static class Patch{
        private Long counselorId;

        private String password;

        private String newPassword;

        private String confirmNewPassword;

        public void updateCounselorId(Long counselorId) {
            this.counselorId = counselorId;
        }
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

        private String expertiseField;

        private Role role;

//        private MemberType memberType;

        private String refreshToken;

        private LocalDateTime tokenExpirationTime;
    }

    @Getter @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginResponse {

        private String grantType;

        private String accessToken;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private Date accessTokenExpireTime;

        private String refreshToken;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private Date refreshTokenExpireTime;

        private Role role;

        public static CounselorDto.LoginResponse of(JwtTokenDto jwtTokenDto, Role role){
            return LoginResponse.builder()
                    .role(role)
                    .grantType(jwtTokenDto.getGrantType())
                    .accessToken(jwtTokenDto.getAccessToken())
                    .accessTokenExpireTime(jwtTokenDto.getAccessTokenExpireTime())
                    .refreshToken(jwtTokenDto.getRefreshToken())
                    .refreshTokenExpireTime(jwtTokenDto.getRefreshTokenExpireTime())
                    .build();
        }
    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class MyPageResponse {

        private Long counselorId;
        private Role role;
        private String email;
        private String counselorName;
        private String password;
    }
}
