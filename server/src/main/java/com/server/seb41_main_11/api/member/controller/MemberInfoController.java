package com.server.seb41_main_11.api.member.controller;

import com.server.seb41_main_11.api.member.dto.MemberInfoResponseDto;
import com.server.seb41_main_11.api.member.service.MemberInfoService;
import com.server.seb41_main_11.global.jwt.service.TokenManager;
import com.server.seb41_main_11.global.resolver.memberinfo.MemberInfo;
import com.server.seb41_main_11.global.resolver.memberinfo.MemberInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 회원 정보 조회 Controller (OauthLoginService에서 회원 정보를 가져올 때 사용함.. feign이 들어가 있으니 지우면 안됨)
 * http://localhost:8080/api/member/info
 * Authorization에 아무 값도 안넣은 경우 -> AuthenticationIntercepter //1 에서 예외 발생 -> Authrization Header가 빈값입니다
 * 아무 값이나 넣은 경우 -> 인증 타입이 Bearer 타입이 아닙니다 예외 발생
 * Bearer 붙여서 아무 값이나 넣은 경우 -> 해당 토큰은 유효한 토큰이 아닙니다 예외 발생
 * refresh 토큰 값을 넣은 경우 -> 해당 토큰은 ACCESS TOKEN이 아닙니다 예외 발생
 * Access 토큰 값을 넣어서 보낸 경우 -> 회원 정보 조회 -> memberId, email, memberName, profile, role 반환
 */
//@Tag(name = "member", description = "회원 API")
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberInfoController {

    private final TokenManager tokenManager;
    private final MemberInfoService memberInfoService;

//    @Tag(name = "member")
//    @Operation(summary = "회원 정보 조회 API", description = "회원 정보 조회 API")
//    @ApiResponses({
//            @ApiResponse(responseCode = "500", description = "서버 오류 발생"),
//            @ApiResponse(responseCode = "M-003", description = "해당 회원은 존재하지 않는 회원입니다.")
//    })
    @GetMapping("/info")
    public ResponseEntity<MemberInfoResponseDto> getMemberInfo(@MemberInfo MemberInfoDto memberInfoDto) {

        Long memberId = memberInfoDto.getMemberId();
        MemberInfoResponseDto memberInfoResponseDto = memberInfoService.getMemberInfo(memberId);

        return ResponseEntity.ok(memberInfoResponseDto);
    }

}
