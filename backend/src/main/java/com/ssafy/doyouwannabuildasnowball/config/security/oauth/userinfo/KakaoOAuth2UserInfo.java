package com.ssafy.doyouwannabuildasnowball.config.security.oauth.userinfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {


/*
    System.out.println(attributes);
    {id=아이디값,
    connected_at=2022-02-22T15:50:21Z,
    properties={nickname=이름},
    kakao_account={
        profile_nickname_needs_agreement=false,
        profile={nickname=이름},
        has_email=true,
        email_needs_agreement=false,
        is_email_valid=true,
        is_email_verified=true,
        email=이메일}
    }
*/
    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public Long getId() {
        return (Long) attributes.get("id");
    }

    @Override
    public String getNickname() {
        return (String) ((Map<String, Object>) attributes.get("properties")).get("nickname");
    }

    @Override
    public String getName() {
        Map<String, Object> properties = getProperties("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("nickname");
    }

    @Override
    public String getEmail() {
        Map<String, Object> properties = getProperties("kakao_account");
        if (properties == null) {
            return null;
        }
        return (String) properties.get("email");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> properties = getProperties("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("thumbnail_image");
    }

    private Map<String, Object> getProperties(String properties) {
        return (Map<String, Object>) attributes.get(properties);
    }

}