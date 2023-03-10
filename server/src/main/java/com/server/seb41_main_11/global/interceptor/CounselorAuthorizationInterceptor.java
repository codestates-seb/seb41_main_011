package com.server.seb41_main_11.global.interceptor;

import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.AuthenticationException;
import com.server.seb41_main_11.global.jwt.service.TokenManager;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 회원의 role를 검증(인가 인터셉터)
 * role이 counselor이라면 true 반환, 아니라면 예외 처리
 */

@Component
@RequiredArgsConstructor
public class CounselorAuthorizationInterceptor implements HandlerInterceptor {
    private final TokenManager tokenManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if(StringUtils.equals(request.getMethod(), "OPTIONS")){
            return true;
        }
        String authorizationHeader = request.getHeader("Authorization");
        String accessToken = authorizationHeader.split(" ")[1];

        Claims tokenClaims = tokenManager.getTokenClaims(accessToken);
        String role = (String)tokenClaims.get("role");
        if(!Role.COUNSELOR.equals(Role.valueOf(role))) {
            throw new AuthenticationException(ErrorCode.FORBIDDEN_COUNSELOR);
        }

        return true;
    }
}
