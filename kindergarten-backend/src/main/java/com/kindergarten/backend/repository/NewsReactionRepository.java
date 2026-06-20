package com.kindergarten.backend.repository;

import com.kindergarten.backend.entity.NewsReaction;
import com.kindergarten.backend.entity.NewsReactionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsReactionRepository extends JpaRepository<NewsReaction, NewsReactionId> {

    List<NewsReaction> findByIdArticleId(String articleId);
}
