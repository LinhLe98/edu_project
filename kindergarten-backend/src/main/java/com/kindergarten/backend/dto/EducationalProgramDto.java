package com.kindergarten.backend.dto;

import com.kindergarten.backend.enums.AgeGroup;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class EducationalProgramDto {
    String id;
    String title;
    String slug;
    String shortDescription;
    String fullDescription;
    String coverImage;
    String iconEmoji;
    AgeGroup ageGroup;
    int orderIndex;
    String longDescription;
    String weeklySchedule;
    List<String> outcomes;
    List<String> featuredImages;
    List<ProgramAlbumRefDto> albums;
}
