package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum SocialPlatform {
    FACEBOOK("facebook"),
    ZALO("zalo"),
    YOUTUBE("youtube"),
    INSTAGRAM("instagram"),
    TIKTOK("tiktok");

    private final String value;

    SocialPlatform(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
