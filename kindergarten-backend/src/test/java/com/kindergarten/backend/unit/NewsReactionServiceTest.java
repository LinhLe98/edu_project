package com.kindergarten.backend.unit;

import com.kindergarten.backend.dto.NewsReactionSummaryDto;
import com.kindergarten.backend.entity.NewsArticle;
import com.kindergarten.backend.entity.NewsReaction;
import com.kindergarten.backend.entity.NewsReactionId;
import com.kindergarten.backend.enums.ReactionType;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.repository.NewsArticleRepository;
import com.kindergarten.backend.repository.NewsReactionRepository;
import com.kindergarten.backend.service.impl.NewsReactionServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NewsReactionServiceTest {

    @Mock private NewsReactionRepository reactionRepository;
    @Mock private NewsArticleRepository articleRepository;

    @InjectMocks
    private NewsReactionServiceImpl service;

    private NewsArticle stubArticle(String slug) {
        NewsArticle a = new NewsArticle();
        a.setId("news-1");
        a.setSlug(slug);
        return a;
    }

    @Test
    void getReactions_returnsMapOfSlugToCount() {
        when(articleRepository.findBySlug("test-slug")).thenReturn(Optional.of(stubArticle("test-slug")));
        NewsReaction heartReaction = new NewsReaction(new NewsReactionId("news-1", ReactionType.HEART), 5L);
        when(reactionRepository.findByIdArticleId("news-1")).thenReturn(List.of(heartReaction));

        NewsReactionSummaryDto result = service.getReactions("test-slug");

        assertThat(result.getReactions()).containsEntry("heart", 5L);
    }

    @Test
    void getReactions_throwsNotFound_whenSlugMissing() {
        when(articleRepository.findBySlug("bad-slug")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getReactions("bad-slug"))
            .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void toggleReaction_incrementsCount_whenNotReacted() {
        when(articleRepository.findBySlug("test-slug")).thenReturn(Optional.of(stubArticle("test-slug")));
        NewsReactionId id = new NewsReactionId("news-1", ReactionType.HEART);
        when(reactionRepository.findById(id)).thenReturn(Optional.empty());
        NewsReaction saved = new NewsReaction(id, 1L);
        when(reactionRepository.save(any())).thenReturn(saved);
        when(reactionRepository.findByIdArticleId("news-1")).thenReturn(List.of(saved));

        NewsReactionSummaryDto result = service.toggleReaction("test-slug", ReactionType.HEART, false);

        assertThat(result.getReactions()).containsEntry("heart", 1L);
    }

    @Test
    void toggleReaction_decrementsCount_whenReacted() {
        when(articleRepository.findBySlug("test-slug")).thenReturn(Optional.of(stubArticle("test-slug")));
        NewsReactionId id = new NewsReactionId("news-1", ReactionType.HEART);
        NewsReaction existing = new NewsReaction(id, 3L);
        when(reactionRepository.findById(id)).thenReturn(Optional.of(existing));
        NewsReaction saved = new NewsReaction(id, 2L);
        when(reactionRepository.save(existing)).thenReturn(saved);
        when(reactionRepository.findByIdArticleId("news-1")).thenReturn(List.of(saved));

        NewsReactionSummaryDto result = service.toggleReaction("test-slug", ReactionType.HEART, true);

        // count decremented to 2
        assertThat(result.getReactions()).containsEntry("heart", 2L);
    }
}
