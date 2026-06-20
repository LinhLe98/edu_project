package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.ContactInfoDto;
import com.kindergarten.backend.dto.SupportRequestCreateDto;
import com.kindergarten.backend.dto.SupportRequestDto;
import com.kindergarten.backend.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Contact information and support requests")
public class ContactController {

    private final ContactService service;

    @GetMapping
    @Operation(summary = "Get school contact information")
    public ResponseEntity<ApiResponse<ContactInfoDto>> getContactInfo() {
        return ResponseEntity.ok(ApiResponse.ok(service.findContactInfo()));
    }

    @PostMapping("/support-requests")
    @Operation(summary = "Submit a support request")
    public ResponseEntity<ApiResponse<SupportRequestDto>> createSupportRequest(
            @Valid @RequestBody SupportRequestCreateDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(service.createSupportRequest(dto)));
    }
}
