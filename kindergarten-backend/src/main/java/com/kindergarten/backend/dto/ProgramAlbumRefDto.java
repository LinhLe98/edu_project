package com.kindergarten.backend.dto;

import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.AlbumCategory;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ProgramAlbumRefDto {
    String id;
    String title;
    String coverImage;
    AgeGroup ageGroup;
    AlbumCategory category;
}
