package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.NewsArticleDto;
import com.kindergarten.backend.enums.NewsCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NewsService {
    Page<NewsArticleDto> findAll(Pageable pageable);
    List<NewsArticleDto> findFeatured();
    List<NewsArticleDto> findLatest(int count);
    List<NewsArticleDto> findByCategory(NewsCategory category);
    NewsArticleDto findBySlug(String slug);
}
