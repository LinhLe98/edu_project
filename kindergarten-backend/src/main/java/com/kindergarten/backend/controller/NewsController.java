package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.NewsArticleDto;
import com.kindergarten.backend.dto.NewsCommentCreateDto;
import com.kindergarten.backend.dto.NewsCommentDto;
import com.kindergarten.backend.dto.NewsReactionSummaryDto;
import com.kindergarten.backend.enums.NewsCategory;
import com.kindergarten.backend.enums.ReactionType;
import com.kindergarten.backend.service.NewsCommentService;
import com.kindergarten.backend.service.NewsReactionService;
import com.kindergarten.backend.service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
@Tag(name = "News", description = "News articles, comments and reactions")
public class NewsController {

    private final NewsService service;
    private final NewsCommentService commentService;
    private final NewsReactionService reactionService;

    @GetMapping
    @Operation(summary = "Get paginated news articles")
    public ResponseEntity<ApiResponse<Page<NewsArticleDto>>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(ApiResponse.ok(service.findAll(PageRequest.of(page, size))));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured news articles")
    public ResponseEntity<ApiResponse<List<NewsArticleDto>>> findFeatured() {
        return ResponseEntity.ok(ApiResponse.ok(service.findFeatured()));
    }

    @GetMapping("/latest")
    @Operation(summary = "Get latest N news articles")
    public ResponseEntity<ApiResponse<List<NewsArticleDto>>> findLatest(
            @RequestParam(defaultValue = "3") int count) {
        return ResponseEntity.ok(ApiResponse.ok(service.findLatest(count)));
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get news articles by category slug")
    public ResponseEntity<ApiResponse<List<NewsArticleDto>>> findByCategory(@PathVariable NewsCategory category) {
        return ResponseEntity.ok(ApiResponse.ok(service.findByCategory(category)));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get news article by slug")
    public ResponseEntity<ApiResponse<NewsArticleDto>> findBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(service.findBySlug(slug)));
    }

    // --- Comments ---

    @GetMapping("/{slug}/comments")
    @Operation(summary = "Get approved comments for an article")
    public ResponseEntity<ApiResponse<List<NewsCommentDto>>> getComments(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(commentService.getApprovedComments(slug)));
    }

    @PostMapping("/{slug}/comments")
    @Operation(summary = "Submit a comment (starts as pending)")
    public ResponseEntity<ApiResponse<NewsCommentDto>> createComment(
            @PathVariable String slug,
            @Valid @RequestBody NewsCommentCreateDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(commentService.createComment(slug, dto)));
    }

    // --- Reactions ---

    @GetMapping("/{slug}/reactions")
    @Operation(summary = "Get reaction counts for an article")
    public ResponseEntity<ApiResponse<NewsReactionSummaryDto>> getReactions(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(reactionService.getReactions(slug)));
    }

    @PostMapping("/{slug}/reactions/{reaction}")
    @Operation(summary = "Toggle a reaction (increment if not reacted, decrement if reacted)")
    public ResponseEntity<ApiResponse<NewsReactionSummaryDto>> toggleReaction(
            @PathVariable String slug,
            @PathVariable ReactionType reaction,
            @RequestParam(defaultValue = "false") boolean reacted) {
        return ResponseEntity.ok(ApiResponse.ok(reactionService.toggleReaction(slug, reaction, reacted)));
    }
}
