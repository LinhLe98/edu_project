package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.HeroSlideDto;
import com.kindergarten.backend.service.SlideService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/slides")
@RequiredArgsConstructor
@Tag(name = "Slides", description = "Hero slides for homepage carousel")
public class SlideController {

    private final SlideService service;

    @GetMapping
    @Operation(summary = "Get all hero slides ordered by index")
    public ResponseEntity<ApiResponse<List<HeroSlideDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.ok(service.findAll()));
    }
}
