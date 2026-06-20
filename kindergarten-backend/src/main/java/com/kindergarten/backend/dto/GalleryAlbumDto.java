package com.kindergarten.backend.dto;

import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.AlbumCategory;
import lombok.Builder;
import lombok.Value;

import java.time.OffsetDateTime;
import java.util.List;

@Value
@Builder
public class GalleryAlbumDto {
    String id;
    String title;
    String description;
    String coverImage;
    AgeGroup ageGroup;
    AlbumCategory category;
    OffsetDateTime createdAt;
    List<GalleryImageDto> images;
}
