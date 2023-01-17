package com.server.seb41_main_11.domain.counselor.entity;

import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.global.jwt.dto.JwtTokenDto;
import com.server.seb41_main_11.global.util.DateTimeUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Counselor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long counselorId;

    @Column(unique = true, length = 50, nullable = false)
    @Email
    private String email;

    @Column(length = 200)
//    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@!%*#?&])[A-Za-z\\d@!%*#?&]{8,}$")
    private String password;
    @Column(nullable = false, length = 20)
    private String counselorName;
    //실명

    @Column(length = 10)
    private String birth;
    // 생년월일

    @Column
    private String graduated;
    //학력

    @Column(length = 200)
    private String profile;
    //프로필 이미지

    @Column
    private String career;
    //경력
    @Column
    private String introduce;
    //소개
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Role role;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false, length = 10)
//    private MemberType memberType;

    @Column(length = 250)
    private String refreshToken;

    private LocalDateTime tokenExpirationTime;
    @Builder
    public Counselor(Long counselorId, String email, String password, String counselorName, String birth, String graduated, String profile, String career, String introduce) {
        this.counselorId = counselorId;
        this.email = email;
        this.password = password;
        this.counselorName = counselorName;
        this.birth = birth;
        this.graduated = graduated;
        this.profile = profile;
        this.career = career;
        this.introduce = introduce;
    }


    public void updateRefreshToken(JwtTokenDto jwtTokenDto) {
        this.refreshToken = jwtTokenDto.getRefreshToken();
        this.tokenExpirationTime = DateTimeUtils.convertToLocalDateTime(jwtTokenDto.getRefreshTokenExpireTime());
    }
}
