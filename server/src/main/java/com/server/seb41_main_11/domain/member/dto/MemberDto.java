package com.server.seb41_main_11.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.global.jwt.dto.JwtTokenDto;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.Date;


public class MemberDto {

    @Getter
    public static class Post{

        @Email
        private String email;

        private String memberName;

//        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@!%*#?&])[A-Za-z\\d@!%*#?&]{8,}$")
//        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")
        private String password;

        private String confirmPassword;

        private String nickName;

        private String birth;

    }

    @Getter
    public static class Login{
//        @Pattern(regexp = "\t^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$")
        private String email;
//        @Pattern(regexp = "\t^.*(?=^.{8,15}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$")
        private String password;

        private String memberType;

    }
    @Getter
    @NoArgsConstructor
    public static class Patch{
        private Long memberId;

        private String nickName;

        private String password;

        private String newPassword;

        private String confirmNewPassword;

        private String birth;

        public void updateMemberId(Long memberId){
            this.memberId = memberId;
        }

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

        private String refreshToken;

        private LocalDateTime tokenExpirationTime;

    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class MyPageResponse{
        private Long memberId;

        private Role role;

        private String email;

        private String memberName;

        private String nickName;

        private MemberType memberType;

        private String birth;

        private String password;

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
        public static LoginResponse of(JwtTokenDto jwtTokenDto, Role role){
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
}
