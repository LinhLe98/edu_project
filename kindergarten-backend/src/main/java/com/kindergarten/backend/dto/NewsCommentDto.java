package com.kindergarten.backend.dto;

import lombok.Builder;
import lombok.Value;

import java.time.OffsetDateTime;

@Value
@Builder
public class NewsCommentDto {
    Long id;
    String authorName;
    String message;
    OffsetDateTime createdAt;
}
