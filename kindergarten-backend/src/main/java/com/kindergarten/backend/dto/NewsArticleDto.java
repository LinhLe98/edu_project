package com.kindergarten.backend.dto;

import com.kindergarten.backend.enums.NewsCategory;
import lombok.Builder;
import lombok.Value;

import java.time.OffsetDateTime;
import java.util.List;

@Value
@Builder
public class NewsArticleDto {
    String id;
    String title;
    String slug;
    String excerpt;
    String content;
    String coverImage;
    OffsetDateTime publishedAt;
    NewsCategory category;
    boolean featured;
    List<String> tags;
}
