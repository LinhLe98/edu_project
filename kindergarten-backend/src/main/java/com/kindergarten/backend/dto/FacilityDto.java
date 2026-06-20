package com.kindergarten.backend.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class FacilityDto {
    String id;
    String name;
    String description;
    String iconEmoji;
    List<FacilityImageDto> images;
}
