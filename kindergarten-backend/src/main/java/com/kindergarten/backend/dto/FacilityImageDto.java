package com.kindergarten.backend.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class FacilityImageDto {
    String id;
    String src;
    String alt;
    String caption;
    int width;
    int height;
}
