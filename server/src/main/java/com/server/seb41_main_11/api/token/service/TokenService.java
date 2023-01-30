package com.server.seb41_main_11.api.token.service;

import com.server.seb41_main_11.api.token.dto.AccessTokenResponseDto;
import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.counselor.service.CounselorService;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.global.jwt.constant.GrantType;
import com.server.seb41_main_11.global.jwt.service.TokenManager;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * 리프레쉬 토큰을 통해 Access 토큰을 생성하는 서비스
 */
@Service
@Transactional
@RequiredArgsConstructor
public class TokenService {

    private final MemberService memberService;
    private final TokenManager tokenManager;

    private final CounselorService counselorService;

    public AccessTokenResponseDto createAccessTokenByRefreshToken(String refreshToken) {

        Member member = memberService.findMemberByRefreshToken(refreshToken);

        Counselor counselor = counselorService.findCounselorByRefreshToken(refreshToken);

        Claims tokenClaims = tokenManager.getTokenClaims(refreshToken);
        String role = (String) tokenClaims.get("role");

        Date accessTokenExpireTime = tokenManager.createAccessTokenExpireTime();

        if(role.equals("COUNSELOR")) {
            String accessToken = tokenManager.createAccessToken(counselor.getCounselorId(), counselor.getRole(), accessTokenExpireTime);

            return AccessTokenResponseDto.builder()
                    .grantType(GrantType.BEARER.getType())
                    .accessToken(accessToken)
                    .accessTokenExpireTime(accessTokenExpireTime)
                    .build();
        }else{
            String accessToken = tokenManager.createAccessToken(member.getMemberId(), member.getRole(), accessTokenExpireTime);

            return AccessTokenResponseDto.builder()
                    .grantType(GrantType.BEARER.getType())
                    .accessToken(accessToken)
                    .accessTokenExpireTime(accessTokenExpireTime)
                    .build();
        }
    }

}