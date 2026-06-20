package com.kindergarten.backend.dto;

import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.MaterialCategory;
import com.kindergarten.backend.enums.MaterialType;
import lombok.Builder;
import lombok.Value;

import java.time.OffsetDateTime;

@Value
@Builder
public class LearningMaterialDto {
    String id;
    String title;
    MaterialType type;
    String icon;
    MaterialCategory category;
    String description;
    String fileUrl;
    String size;
    OffsetDateTime updatedAt;
    AgeGroup ageGroup;
}
