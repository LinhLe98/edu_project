package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.NewsCommentDto;
import com.kindergarten.backend.dto.SupportRequestDto;
import com.kindergarten.backend.service.ContactService;
import com.kindergarten.backend.service.NewsCommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin-only endpoints (HTTP Basic auth)")
@SecurityRequirement(name = "basicAuth")
public class AdminController {

    private final ContactService contactService;
    private final NewsCommentService commentService;

    @GetMapping("/support-requests")
    @Operation(summary = "Get paginated support requests (admin only)")
    public ResponseEntity<ApiResponse<Page<SupportRequestDto>>> getSupportRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.ok(contactService.findAllSupportRequests(PageRequest.of(page, size))));
    }

    @GetMapping("/comments")
    @Operation(summary = "Get paginated comments filtered by status (default: pending)")
    public ResponseEntity<ApiResponse<Page<NewsCommentDto>>> getComments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.ok(commentService.getPendingComments(PageRequest.of(page, size))));
    }

    @PutMapping("/comments/{id}/approve")
    @Operation(summary = "Approve a comment")
    public ResponseEntity<ApiResponse<NewsCommentDto>> approveComment(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(commentService.approveComment(id)));
    }

    @DeleteMapping("/comments/{id}")
    @Operation(summary = "Delete a comment")
    public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }
}
