package com.kindergarten.backend.dto;

import lombok.Builder;
import lombok.Value;

import java.util.Map;

@Value
@Builder
public class NewsReactionSummaryDto {
    Map<String, Long> reactions;
}
