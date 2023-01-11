package com.server.seb41_main_11.external.oauth.service;

import com.server.seb41_main_11.external.oauth.model.OAuthAttributes;

/**
 * 카카오, 네이버, 구글 등 여러 api를 이용해 구현체를 만들 수 있도록 인터페이스 설정
 */
public interface SocialLoginApiService {

    OAuthAttributes getUserInfo(String accessToken);

}
