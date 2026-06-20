package com.kindergarten.backend.dto;

import com.kindergarten.backend.enums.SocialPlatform;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SocialLinkDto {
    SocialPlatform platform;
    String url;
    String handle;
}
