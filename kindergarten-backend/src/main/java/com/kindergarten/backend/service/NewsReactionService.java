package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.NewsReactionSummaryDto;
import com.kindergarten.backend.enums.ReactionType;

public interface NewsReactionService {
    NewsReactionSummaryDto getReactions(String articleSlug);
    NewsReactionSummaryDto toggleReaction(String articleSlug, ReactionType reaction, boolean currentlyReacted);
}
