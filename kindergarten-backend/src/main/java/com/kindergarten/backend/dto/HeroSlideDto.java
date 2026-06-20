package com.kindergarten.backend.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class HeroSlideDto {
    String id;
    String imageUrl;
    String altText;
    String heading;
    String subheading;
    String ctaLabel;
    String ctaLink;
    String ctaFragment;
    int orderIndex;
}
