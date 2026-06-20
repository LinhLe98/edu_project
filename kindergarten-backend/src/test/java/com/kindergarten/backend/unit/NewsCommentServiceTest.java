package com.kindergarten.backend.unit;

import com.kindergarten.backend.dto.NewsCommentCreateDto;
import com.kindergarten.backend.dto.NewsCommentDto;
import com.kindergarten.backend.entity.NewsArticle;
import com.kindergarten.backend.entity.NewsComment;
import com.kindergarten.backend.enums.CommentStatus;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.NewsCommentMapper;
import com.kindergarten.backend.repository.NewsArticleRepository;
import com.kindergarten.backend.repository.NewsCommentRepository;
import com.kindergarten.backend.service.impl.NewsCommentServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NewsCommentServiceTest {

    @Mock private NewsCommentRepository commentRepository;
    @Mock private NewsArticleRepository articleRepository;
    @Mock private NewsCommentMapper mapper;

    @InjectMocks
    private NewsCommentServiceImpl service;

    private NewsArticle stubArticle(String slug) {
        NewsArticle a = new NewsArticle();
        a.setId("news-1");
        a.setSlug(slug);
        return a;
    }

    @Test
    void getApprovedComments_returnsOnlyApproved() {
        NewsComment comment = new NewsComment();
        comment.setId(1L);
        comment.setAuthorName("Alice");
        comment.setMessage("Great post!");
        comment.setStatus(CommentStatus.APPROVED);
        NewsCommentDto dto = NewsCommentDto.builder()
            .id(1L).authorName("Alice").message("Great post!")
            .createdAt(OffsetDateTime.of(2025, 9, 1, 8, 0, 0, 0, ZoneOffset.ofHours(7))).build();

        when(articleRepository.findBySlug("test-slug")).thenReturn(Optional.of(stubArticle("test-slug")));
        when(commentRepository.findByArticleIdAndStatusOrderByCreatedAtAsc("news-1", CommentStatus.APPROVED))
            .thenReturn(List.of(comment));
        when(mapper.toDtoList(List.of(comment))).thenReturn(List.of(dto));

        List<NewsCommentDto> result = service.getApprovedComments("test-slug");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getAuthorName()).isEqualTo("Alice");
    }

    @Test
    void getApprovedComments_throwsNotFound_whenSlugMissing() {
        when(articleRepository.findBySlug("bad-slug")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getApprovedComments("bad-slug"))
            .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void createComment_savesWithPendingStatus() {
        NewsCommentCreateDto createDto = new NewsCommentCreateDto();
        createDto.setAuthorName("Bob");
        createDto.setMessage("Hello world");

        NewsComment savedComment = NewsComment.builder()
            .id(2L).articleId("news-1").authorName("Bob").message("Hello world")
            .status(CommentStatus.PENDING).build();
        NewsCommentDto dto = NewsCommentDto.builder()
            .id(2L).authorName("Bob").message("Hello world")
            .createdAt(OffsetDateTime.now()).build();

        when(articleRepository.findBySlug("test-slug")).thenReturn(Optional.of(stubArticle("test-slug")));
        when(commentRepository.save(any(NewsComment.class))).thenReturn(savedComment);
        when(mapper.toDto(savedComment)).thenReturn(dto);

        NewsCommentDto result = service.createComment("test-slug", createDto);

        ArgumentCaptor<NewsComment> captor = ArgumentCaptor.forClass(NewsComment.class);
        verify(commentRepository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo(CommentStatus.PENDING);
        assertThat(captor.getValue().getArticleId()).isEqualTo("news-1");
        assertThat(result.getAuthorName()).isEqualTo("Bob");
    }

    @Test
    void approveComment_setsStatusToApproved() {
        NewsComment comment = new NewsComment();
        comment.setId(5L);
        comment.setStatus(CommentStatus.PENDING);
        NewsCommentDto dto = NewsCommentDto.builder().id(5L).authorName("X").message("Y")
            .createdAt(OffsetDateTime.now()).build();

        when(commentRepository.findById(5L)).thenReturn(Optional.of(comment));
        when(commentRepository.save(comment)).thenReturn(comment);
        when(mapper.toDto(comment)).thenReturn(dto);

        service.approveComment(5L);

        assertThat(comment.getStatus()).isEqualTo(CommentStatus.APPROVED);
        verify(commentRepository).save(comment);
    }

    @Test
    void deleteComment_removesById() {
        when(commentRepository.existsById(3L)).thenReturn(true);

        service.deleteComment(3L);

        verify(commentRepository).deleteById(3L);
    }

    @Test
    void deleteComment_throwsNotFound_whenMissing() {
        when(commentRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> service.deleteComment(99L))
            .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void getPendingComments_returnsPaginatedPending() {
        NewsComment c = new NewsComment();
        c.setId(1L);
        c.setStatus(CommentStatus.PENDING);
        Page<NewsComment> page = new PageImpl<>(List.of(c));
        NewsCommentDto dto = NewsCommentDto.builder().id(1L).authorName("A").message("B")
            .createdAt(OffsetDateTime.now()).build();

        when(commentRepository.findByStatusOrderByCreatedAtDesc(eq(CommentStatus.PENDING), any()))
            .thenReturn(page);
        when(mapper.toDto(c)).thenReturn(dto);

        Page<NewsCommentDto> result = service.getPendingComments(PageRequest.of(0, 20));

        assertThat(result.getContent()).hasSize(1);
    }
}
