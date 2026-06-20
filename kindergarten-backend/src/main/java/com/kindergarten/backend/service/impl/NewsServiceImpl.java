package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.NewsArticleDto;
import com.kindergarten.backend.enums.NewsCategory;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.NewsArticleMapper;
import com.kindergarten.backend.repository.NewsArticleRepository;
import com.kindergarten.backend.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsServiceImpl implements NewsService {

    private final NewsArticleRepository repository;
    private final NewsArticleMapper mapper;

    @Override
    public Page<NewsArticleDto> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(mapper::toDto);
    }

    @Override
    public List<NewsArticleDto> findFeatured() {
        return mapper.toDtoList(repository.findByFeaturedTrue());
    }

    @Override
    public List<NewsArticleDto> findLatest(int count) {
        List<NewsArticleDto> all = mapper.toDtoList(repository.findAllByOrderByPublishedAtDesc());
        return all.stream().limit(count).toList();
    }

    @Override
    public List<NewsArticleDto> findByCategory(NewsCategory category) {
        return mapper.toDtoList(repository.findByCategory(category));
    }

    @Override
    public NewsArticleDto findBySlug(String slug) {
        return mapper.toDto(
                repository.findBySlug(slug)
                        .orElseThrow(() -> new ResourceNotFoundException("NewsArticle", slug))
        );
    }
}
