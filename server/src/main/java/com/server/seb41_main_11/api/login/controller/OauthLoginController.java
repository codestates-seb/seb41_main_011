package com.server.seb41_main_11.api.login.controller;

import com.server.seb41_main_11.api.login.dto.OauthLoginDto;
import com.server.seb41_main_11.api.login.service.OauthLoginService;
import com.server.seb41_main_11.api.login.validator.OauthValidator;
import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.global.util.AuthorizationHeaderUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

//@Tag(name = "authentication", description = "로그인/로그아웃/토큰재발급 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OauthLoginController {

    private final OauthValidator oauthValidator;
    private final OauthLoginService oauthLoginService;

//    @Tag(name = "authentication")
//    @Operation(summary = "소셜 로그인 API", description = "소셜 로그인 API")
    @PostMapping("/login")
    public ResponseEntity<OauthLoginDto.Response> oauthLogin(@RequestBody OauthLoginDto.Request oauthLoginRequestDto,
                                                             HttpServletRequest httpServletRequest) {

        String authorizationHeader = httpServletRequest.getHeader("Authorization");
        //헤더에 있는 토큰 정보를 가져옴
        AuthorizationHeaderUtils.validateAuthorization(authorizationHeader); //헤더 유효성 검증
        oauthValidator.validateMemberType(oauthLoginRequestDto.getMemberType()); //멤버타입 검증

        String accessToken = authorizationHeader.split(" ")[1]; //
        OauthLoginDto.Response jwtTokenResponseDto = oauthLoginService
                .oauthLogin(accessToken, MemberType.from(oauthLoginRequestDto.getMemberType()));
        return ResponseEntity.ok(jwtTokenResponseDto);
    }

}