package com.kindergarten.backend.unit;

import com.kindergarten.backend.common.TestDataFactory;
import com.kindergarten.backend.dto.NewsArticleDto;
import com.kindergarten.backend.entity.NewsArticle;
import com.kindergarten.backend.enums.NewsCategory;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.NewsArticleMapper;
import com.kindergarten.backend.repository.NewsArticleRepository;
import com.kindergarten.backend.service.impl.NewsServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NewsServiceTest {

    @Mock
    private NewsArticleRepository repository;

    @Mock
    private NewsArticleMapper mapper;

    @InjectMocks
    private NewsServiceImpl service;

    @Test
    void findAll_returnsPaginatedNews() {
        NewsArticle article = TestDataFactory.newsArticle("news-1", "slug-1", NewsCategory.SU_KIEN);
        Page<NewsArticle> page = new PageImpl<>(List.of(article));
        NewsArticleDto dto = NewsArticleDto.builder().id("news-1").slug("slug-1").title("T").category(NewsCategory.SU_KIEN).build();

        when(repository.findAll(any(Pageable.class))).thenReturn(page);
        when(mapper.toDto(article)).thenReturn(dto);

        Page<NewsArticleDto> result = service.findAll(PageRequest.of(0, 6));

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getId()).isEqualTo("news-1");
    }

    @Test
    void findFeatured_returnsOnlyFeaturedArticles() {
        NewsArticle featured = TestDataFactory.featuredNewsArticle("news-1", "slug-1");
        List<NewsArticle> featuredList = List.of(featured);
        List<NewsArticleDto> dtos = List.of(
                NewsArticleDto.builder().id("news-1").slug("slug-1").featured(true).title("T").category(NewsCategory.SU_KIEN).build()
        );

        when(repository.findByFeaturedTrue()).thenReturn(featuredList);
        when(mapper.toDtoList(featuredList)).thenReturn(dtos);

        List<NewsArticleDto> result = service.findFeatured();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).isFeatured()).isTrue();
    }

    @Test
    void findBySlug_returnsArticle_whenFound() {
        NewsArticle article = TestDataFactory.newsArticle("news-1", "test-slug", NewsCategory.THONG_BAO);
        NewsArticleDto dto = NewsArticleDto.builder().id("news-1").slug("test-slug").title("T").category(NewsCategory.THONG_BAO).build();

        when(repository.findBySlug("test-slug")).thenReturn(Optional.of(article));
        when(mapper.toDto(article)).thenReturn(dto);

        NewsArticleDto result = service.findBySlug("test-slug");

        assertThat(result.getSlug()).isEqualTo("test-slug");
    }

    @Test
    void findBySlug_throwsNotFound_whenMissing() {
        when(repository.findBySlug("missing-slug")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findBySlug("missing-slug"))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void findLatest_returnsLimitedResults() {
        List<NewsArticle> articles = List.of(
                TestDataFactory.newsArticle("n1", "s1", NewsCategory.SU_KIEN),
                TestDataFactory.newsArticle("n2", "s2", NewsCategory.THONG_BAO),
                TestDataFactory.newsArticle("n3", "s3", NewsCategory.HOAT_DONG),
                TestDataFactory.newsArticle("n4", "s4", NewsCategory.TIN_TUC)
        );
        List<NewsArticleDto> dtos = articles.stream()
                .map(a -> NewsArticleDto.builder().id(a.getId()).slug(a.getSlug()).title("T").category(a.getCategory()).build())
                .toList();

        when(repository.findAllByOrderByPublishedAtDesc()).thenReturn(articles);
        when(mapper.toDtoList(articles)).thenReturn(dtos);

        List<NewsArticleDto> result = service.findLatest(3);

        assertThat(result).hasSize(3);
    }
}
