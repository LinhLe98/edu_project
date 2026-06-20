package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.NewsReactionSummaryDto;
import com.kindergarten.backend.entity.NewsArticle;
import com.kindergarten.backend.entity.NewsReaction;
import com.kindergarten.backend.entity.NewsReactionId;
import com.kindergarten.backend.enums.ReactionType;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.repository.NewsArticleRepository;
import com.kindergarten.backend.repository.NewsReactionRepository;
import com.kindergarten.backend.service.NewsReactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsReactionServiceImpl implements NewsReactionService {

    private final NewsReactionRepository reactionRepository;
    private final NewsArticleRepository articleRepository;

    @Override
    public NewsReactionSummaryDto getReactions(String articleSlug) {
        NewsArticle article = findArticleBySlug(articleSlug);
        return buildSummary(article.getId());
    }

    @Override
    @Transactional
    public NewsReactionSummaryDto toggleReaction(String articleSlug, ReactionType reaction, boolean currentlyReacted) {
        NewsArticle article = findArticleBySlug(articleSlug);
        NewsReactionId id = new NewsReactionId(article.getId(), reaction);

        if (currentlyReacted) {
            // Decrement — if row exists, decrease count (floor at 0)
            reactionRepository.findById(id).ifPresent(r -> {
                long newCount = Math.max(0L, r.getCount() - 1);
                r.setCount(newCount);
                reactionRepository.save(r);
            });
        } else {
            // Increment — upsert row
            NewsReaction r = reactionRepository.findById(id)
                .orElseGet(() -> NewsReaction.builder().id(id).count(0L).build());
            r.setCount(r.getCount() + 1);
            reactionRepository.save(r);
        }

        return buildSummary(article.getId());
    }

    private NewsReactionSummaryDto buildSummary(String articleId) {
        Map<String, Long> counts = reactionRepository.findByIdArticleId(articleId)
            .stream()
            .collect(Collectors.toMap(
                r -> r.getId().getReaction().getSlug(),
                NewsReaction::getCount
            ));
        return NewsReactionSummaryDto.builder().reactions(counts).build();
    }

    private NewsArticle findArticleBySlug(String slug) {
        return articleRepository.findBySlug(slug)
            .orElseThrow(() -> new ResourceNotFoundException("NewsArticle", slug));
    }
}
