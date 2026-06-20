package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.NewsCommentCreateDto;
import com.kindergarten.backend.dto.NewsCommentDto;
import com.kindergarten.backend.entity.NewsArticle;
import com.kindergarten.backend.entity.NewsComment;
import com.kindergarten.backend.enums.CommentStatus;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.NewsCommentMapper;
import com.kindergarten.backend.repository.NewsArticleRepository;
import com.kindergarten.backend.repository.NewsCommentRepository;
import com.kindergarten.backend.service.NewsCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsCommentServiceImpl implements NewsCommentService {

    private final NewsCommentRepository commentRepository;
    private final NewsArticleRepository articleRepository;
    private final NewsCommentMapper mapper;

    @Override
    public List<NewsCommentDto> getApprovedComments(String articleSlug) {
        NewsArticle article = findArticleBySlug(articleSlug);
        return mapper.toDtoList(
            commentRepository.findByArticleIdAndStatusOrderByCreatedAtAsc(article.getId(), CommentStatus.APPROVED)
        );
    }

    @Override
    @Transactional
    public NewsCommentDto createComment(String articleSlug, NewsCommentCreateDto dto) {
        NewsArticle article = findArticleBySlug(articleSlug);
        NewsComment comment = NewsComment.builder()
            .articleId(article.getId())
            .authorName(dto.getAuthorName())
            .message(dto.getMessage())
            .status(CommentStatus.PENDING)
            .build();
        return mapper.toDto(commentRepository.save(comment));
    }

    @Override
    @Transactional
    public NewsCommentDto approveComment(Long commentId) {
        NewsComment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new ResourceNotFoundException("NewsComment", String.valueOf(commentId)));
        comment.setStatus(CommentStatus.APPROVED);
        return mapper.toDto(commentRepository.save(comment));
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new ResourceNotFoundException("NewsComment", String.valueOf(commentId));
        }
        commentRepository.deleteById(commentId);
    }

    @Override
    public Page<NewsCommentDto> getPendingComments(Pageable pageable) {
        return commentRepository.findByStatusOrderByCreatedAtDesc(CommentStatus.PENDING, pageable)
            .map(mapper::toDto);
    }

    private NewsArticle findArticleBySlug(String slug) {
        return articleRepository.findBySlug(slug)
            .orElseThrow(() -> new ResourceNotFoundException("NewsArticle", slug));
    }
}
