package com.ssafy.doyouwannabuildasnowball.config.security;

import com.ssafy.doyouwannabuildasnowball.config.security.oauth.JWT.JwtAccessDeniedHandler;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.JWT.JwtAuthenticationEntryPoint;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.JWT.JwtAuthenticationFilter;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler.CustomAccessDeniedHandler;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler.CustomAuthenticationEntryPoint;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.service.CustomOAuth2UserService;
import com.ssafy.doyouwannabuildasnowball.config.security.repository.CookieAuthorizationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomAuthenticationEntryPoint authenticationEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
//            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",

            /* kakao login permit url */
            "/api/**",
            "/api/auth/**",
            "/api/oauth2/**"
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
        http.csrf().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .authorizeRequests()
                .antMatchers(PERMIT_URL_ARRAY).permitAll();
//                .antMatchers("/admin/**").hasRole("ADMIN");

        http
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                .authorizationRequestRepository(cookieAuthorizationRequestRepository)
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler);

        http.exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

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
