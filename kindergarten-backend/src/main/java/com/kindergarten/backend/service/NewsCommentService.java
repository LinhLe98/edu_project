package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.NewsCommentCreateDto;
import com.kindergarten.backend.dto.NewsCommentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NewsCommentService {
    List<NewsCommentDto> getApprovedComments(String articleSlug);
    NewsCommentDto createComment(String articleSlug, NewsCommentCreateDto dto);
    NewsCommentDto approveComment(Long commentId);
    void deleteComment(Long commentId);
    Page<NewsCommentDto> getPendingComments(Pageable pageable);
}
