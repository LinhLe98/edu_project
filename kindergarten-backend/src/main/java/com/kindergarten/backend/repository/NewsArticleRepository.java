package com.kindergarten.backend.repository;

import com.kindergarten.backend.entity.NewsArticle;
import com.kindergarten.backend.enums.NewsCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, String> {
    Page<NewsArticle> findAll(Pageable pageable);
    List<NewsArticle> findByFeaturedTrue();
    List<NewsArticle> findByCategory(NewsCategory category);
    Optional<NewsArticle> findBySlug(String slug);
    List<NewsArticle> findAllByOrderByPublishedAtDesc();
}
