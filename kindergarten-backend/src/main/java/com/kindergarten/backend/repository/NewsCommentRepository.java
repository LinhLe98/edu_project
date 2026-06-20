package com.kindergarten.backend.repository;

import com.kindergarten.backend.entity.NewsComment;
import com.kindergarten.backend.enums.CommentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsCommentRepository extends JpaRepository<NewsComment, Long> {

    List<NewsComment> findByArticleIdAndStatusOrderByCreatedAtAsc(String articleId, CommentStatus status);

    Page<NewsComment> findByStatusOrderByCreatedAtDesc(CommentStatus status, Pageable pageable);
}
