package com.ssafy.doyouwannabuildasnowball.config.security;

import com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler.CustomAccessDeniedHandler;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler.CustomAuthenticationEntryPoint;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.service.CustomOAuth2UserService;
import com.ssafy.doyouwannabuildasnowball.config.security.repository.CookieAuthorizationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // 로그인 필요 없는 페이지

    private final CustomAuthenticationEntryPoint authenticationEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/login"
    };

    /**
     * Spring Security의 설정 가능
     *
     * spring security의 각종 설정은 HTTP Security를 통해 설정
     * - 리소스(URL) 접근 권한 설정
     * - 인증 전체 흐름에 힐요한 Login, Logout 페이지 인증 완료 후 페이지 인증 실패 시 이동페이지 등 설정
     * - 인증 로직을 커스텀하기 위한 커스텀 필터 설정
     * - 기타 csrf, 강제 https 호출
     *
     *
     * @param http the {@link HttpSecurity} to modify
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // swagger API 호출시 403 에러 발생 방지
                .authorizeRequests()
                .antMatchers(PERMIT_URL_ARRAY).permitAll() // 리소스(URL)의 권한 설정, antMatchers 설정한 리소스의 접근을 인증절차 없이 허용
                .anyRequest().permitAll()
                .and()
                .exceptionHandling()
//                .authenticationEntryPoint(authenticationEntryPoint) // 인증이 되지 않은 유저가 요청을 했을 때 동작
                .accessDeniedHandler(accessDeniedHandler) // 서버에 요청을 할 때 액세스가 가능한지 권한을 체크후 액세스 할 수 없는 요청을 했을시 동작
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)


        ;
//        http
//                .csrf().disable() // swagger API 호출시 403 에러 발생 방지
//                .authorizeRequests()
//                .antMatchers(PERMIT_URL_ARRAY).permitAll() // 리소스(URL)의 권한 설정, antMatchers 설정한 리소스의 접근을 인증절차 없이 허용
//                .anyRequest().anonymous()
//                .and()
//                .exceptionHandling()
//                .authenticationEntryPoint(authenticationEntryPoint) // 인증이 되지 않은 유저가 요청을 했을 때 동작
//                .accessDeniedHandler(accessDeniedHandler) // 서버에 요청을 할 때 액세스가 가능한지 권한을 체크후 액세스 할 수 없는 요청을 했을시 동작
//                .and()
//
//                // oauth2 kakao login 설정 적용
//                .oauth2Login()
//                .authorizationEndpoint()
//                .baseUri("oauth2/authorize")
//                .authorizationRequestRepository(cookieAuthorizationRequestRepository)
//                .and()
//                .redirectionEndpoint()
//                .baseUri("oauth2/code/*")
//                .and()
//                .userInfoEndpoint()
//                .userService(customOAuth2UserService)
//                .and()
//                .successHandler(oAuth2AuthenticationSuccessHandler)
//                .failureHandler();


//                .and()
//                .defaultSuccessUrl("/{login-success-url}")          // oauth2 인증이 성공했을 때 이동 url 설정
//                .successHandler(OAuth2AuthenticationSuccessHandler) // 인증 프로세스에 따라 사용자 정의 로직 수행
//                .userInfoEndpoint()
//                .userService(userOauth2Service);                    // 로그인 성공 후 로그인 정보 들고 후처리


//        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


        ;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
//        configuration.addAllowedOrigin("http://localhost:3000");
//        configuration.addAllowedOrigin("http://localhost:8080");
//        configuration.addAllowedOrigin("https://i7a601.p.ssafy.io");

        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        configuration.addExposedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
