package com.server.seb41_main_11.web.kakaotoken.dto;

import lombok.*;

/**
 * 카카오 로그인 flow에서 사용
 */

public class KakaoTokenDto {

    @Builder
    @Getter
    public static class Request {
        private String grant_type;
        private String client_id;
        private String redirect_uri;
        private String code;
        private String client_secret;
    }

    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder @Getter
    public static class Response {
        private String token_type;
        private String access_token;
        private Integer expires_in;
        private String refresh_token;
        private Integer refresh_token_expires_in;
        private String scope;
    }

}