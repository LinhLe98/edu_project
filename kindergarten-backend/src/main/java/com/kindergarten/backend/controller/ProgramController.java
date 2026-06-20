package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.EducationalProgramDto;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.service.ProgramService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/programs")
@RequiredArgsConstructor
@Tag(name = "Programs", description = "Educational programs")
public class ProgramController {

    private final ProgramService service;

    @GetMapping
    @Operation(summary = "Get all educational programs ordered by index")
    public ResponseEntity<ApiResponse<List<EducationalProgramDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.ok(service.findAll()));
    }

    @GetMapping("/age-group/{age}")
    @Operation(summary = "Get programs by age group")
    public ResponseEntity<ApiResponse<List<EducationalProgramDto>>> findByAgeGroup(@PathVariable AgeGroup age) {
        return ResponseEntity.ok(ApiResponse.ok(service.findByAgeGroup(age)));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get program by slug")
    public ResponseEntity<ApiResponse<EducationalProgramDto>> findBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(service.findBySlug(slug)));
    }
}
