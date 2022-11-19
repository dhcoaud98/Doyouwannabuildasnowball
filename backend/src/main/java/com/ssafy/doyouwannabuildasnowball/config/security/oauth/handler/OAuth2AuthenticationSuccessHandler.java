package com.ssafy.doyouwannabuildasnowball.config.security.oauth.handler;

import com.ssafy.doyouwannabuildasnowball.common.exception.CustomException;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo.CustomUserDetails;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.util.CookieUtil;
import com.ssafy.doyouwannabuildasnowball.config.security.oauth.JWT.JwtTokenProvider;
import com.ssafy.doyouwannabuildasnowball.config.security.repository.CookieAuthorizationRequestRepository;
import com.ssafy.doyouwannabuildasnowball.domain.Member;
import com.ssafy.doyouwannabuildasnowball.repository.jpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import static com.ssafy.doyouwannabuildasnowball.config.security.repository.CookieAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;
import static com.ssafy.doyouwannabuildasnowball.common.exception.ErrorCode.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${oauth2.authorizedRedirectUri}")
    private String redirectUri;
    private final JwtTokenProvider tokenProvider;
    private final CookieAuthorizationRequestRepository authorizationRequestRepository;

    private final MemberRepository memberRepository;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("[OAut2AuthenticationSuccessHandler] on Authentication Success");
        String targetUrl = determineTargetUrl(request, response, authentication);
        log.info("target url : " + targetUrl);
        if (response.isCommitted()) {
            log.debug("Response has already been committed");
            return;
        }
        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        log.info("[determineTargetUrl] determine target url");
        Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new CustomException(BAD_REQUEST_URI);
        }
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
        // JWT 생성
        String accessToken = tokenProvider.createAccessToken(authentication);


        boolean isNewMember = true;
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        Long id = Long.valueOf(user.getName());
        Optional<Member> registeredMemberOptional = memberRepository.findById(id);
        if(registeredMemberOptional.isPresent() && registeredMemberOptional.get().getRefreshToken() != null)
            isNewMember = false;

        tokenProvider.createRefreshToken(authentication, response);
//        log.info("[authentication log]");
//        log.info("name : " + authentication.getName());
//        log.info("authorities : " + authentication.getAuthorities().toString());
//        log.info("authentication detail : " + authentication.getDetails().toString());
//        log.info("access token: {} ", accessToken);


        log.info("[determineTargetUrl] access token : " + accessToken);
        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("accessToken", accessToken)
                .queryParam("newMember", isNewMember)
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);
        URI authorizedUri = URI.create(redirectUri);

        if (authorizedUri.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                && authorizedUri.getPort() == clientRedirectUri.getPort()) {
            return true;
        }
        return false;
    }
}
