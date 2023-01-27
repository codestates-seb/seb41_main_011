package com.server.seb41_main_11.global.config.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.seb41_main_11.global.interceptor.AdminAuthorizationInterceptor;
import com.server.seb41_main_11.global.interceptor.AuthenticationInterceptor;
import com.server.seb41_main_11.global.interceptor.CounselorAuthorizationInterceptor;
import com.server.seb41_main_11.global.resolver.memberinfo.MemberInfoArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuthenticationInterceptor authenticationInterceptor;
    private final MemberInfoArgumentResolver memberInfoArgumentResolver;
    private final AdminAuthorizationInterceptor adminAuthorizationInterceptor;
    private final CounselorAuthorizationInterceptor counselorAuthorizationInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //어떤 url로 요청이 왔을 때 허용할 것인지
                .allowedOrigins("*")
                .allowedMethods(
                        //별표(*) 사용 시 모든 오리진 허용 및 콤마로 여러 origin을 설정할 수도 있음
                        //즉, locathost:8082로 시작하는 엔드포인트에서 /api/**으로 아래 요청을 보내는 것을 허용함
                        HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.PATCH.name(),
                        HttpMethod.DELETE.name(),
                        HttpMethod.OPTIONS.name()
                )
                .maxAge(3600);
        //preplight는 교차출처 HTTP 요청 전 요청의 헤더와 메서드에 대해 인식하고 있는지 확인
        //계속 preplight를 포함한 두 번의 요청을 보내게 되면 성능 저하가 발생하기 때문에 시간 설정하여 한 번만 전송하게 만듬
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //todo : 수정 요망
        registry.addInterceptor(authenticationInterceptor)
                .order(1) //시행 순서 지정
                .addPathPatterns("/api/**") //인증 인터셉터가 어떤 api에 작동할지 지정
                .excludePathPatterns( //인증 인터셉터가 어떤 api에 작동하지 않을지 지정
                        "/kakao/login", //카카오 로그인 버튼
                        "/api/logout", //로그아웃
                        "/api/access-token/issue", // Access 토큰 재발급
                        "/api/members/new", //회원가입
                        "/api/members/login", //자체 로그인
                        "/api/oauth/login", //카카오 로그인
//                        "/api/counselors/new", //상담사 회원가입 (관리자 토큰 필요)
                        "/api/counselors/login", //상담사 로그인
                        "/api/posts/lookup/{post-id}", //게시글 단건 조회
                        "/api/posts/lookup/list", //게시글 전체 조회
                        "/api/notices/lookup/{notice-id}", //공지사항 단건 조회
                        "/api/notices/lookup/list", // 공지사항 전체 조회
                        "/api/programs/lookup/{program-id}", //프로그램 개별 조회
                        "/api/programs/lookup/list", //프로그램 전체 조회
                        "/api/programs/lookup/search" // 고민별 프로그램 조회
                        ); // 인증 인터셉터를 동작시키지 않을 예외적인 uri 작성

        registry.addInterceptor(adminAuthorizationInterceptor) //인증 인터셉터 다음 관리자 인가 인터셉터 실행
                .order(2)
                .addPathPatterns("/api/members/total-look-up") //관리자 페이지 회원 전체 조회
                .addPathPatterns("/api/counselors/new") //상담사 등록
                .addPathPatterns("/api/counselors/total-look-up")//관리자 페이지 상담사 전체 조회
                .addPathPatterns("/api/counselors/delete/{counselorId}") //상담사 삭제
                .addPathPatterns("/api/notices/post") //공지사항 생성
                .addPathPatterns("/api/notices/patch") //공지사항 수정
                .addPathPatterns("/api/notices/delete/1") //공지사항 삭제
                .addPathPatterns("/api/programs/post") //프로그램 등록
                .addPathPatterns("/api/programs/patch") //프로그램 수정
                .addPathPatterns("/api/programs/admin/lookup/list") //마이페이지 개설 프로그램 전체 조회
                .addPathPatterns("/api/programs/admin/lookup/{counselor-id}/list") //마이페이지 상담사 상담 이력 전체 조회
                .addPathPatterns("/api/programs/delete/{program-id}") //프로그램 삭제
                .addPathPatterns("/api/pays/admin/{pay-id}/edit") //결제 취소 요청 승인
                .addPathPatterns("/api/pays/admin/{member-id}/lookup/list") //마이페이지 특정 회원 상담 내역 전체 조회
                .addPathPatterns("/api/pays/admin/payment/list"); //결제 완료 내역 조회


        registry.addInterceptor(counselorAuthorizationInterceptor) // 상담사 인가 인터셉터 실행
                .order(3)
                .addPathPatterns("/api/counselors/look-up/{counselorId}") //상담사 마이페이지
                .addPathPatterns("/api/counselors/edit/{counselorId}") // 상담사 마이페이지 수정
                .addPathPatterns("/api/programs/patch/counselor/{program-id}") //마이페이지 나의 프로그램 수정
                .addPathPatterns("/api/programs/counselors/{counselor-id}/lookup/{program-id}") // 마이페이지 나의 프로그램 개별 조회
                .addPathPatterns("/api/programs/counselors/lookup/list"); //상담사 상담 이력 전체 조회
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(memberInfoArgumentResolver);
    }

//    @Bean
//    public FilterRegistrationBean<XssEscapeServletFilter> filterRegistrationBean() {
//        FilterRegistrationBean<XssEscapeServletFilter> filterRegistration = new FilterRegistrationBean<>();
//        filterRegistration.setFilter(new XssEscapeServletFilter());
//        filterRegistration.setOrder(1);
//        filterRegistration.addUrlPatterns("/*");
//        return filterRegistration;
//    }

//    @Override
//    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
//        converters.add(jsonEscapeConverter());
//    }

//    @Bean
//    public MappingJackson2HttpMessageConverter jsonEscapeConverter() {
//        ObjectMapper copy = objectMapper.copy();
//        copy.getFactory().setCharacterEscapes(new HtmlCharacterEscapes());
//        return new MappingJackson2HttpMessageConverter(copy);
//    }

}
