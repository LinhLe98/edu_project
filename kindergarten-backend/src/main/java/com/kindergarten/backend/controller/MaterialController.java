package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.LearningMaterialDto;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.MaterialCategory;
import com.kindergarten.backend.service.MaterialService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/materials")
@RequiredArgsConstructor
@Tag(name = "Materials", description = "Learning materials and documents")
public class MaterialController {

    private final MaterialService service;

    @GetMapping
    @Operation(summary = "Get all learning materials")
    public ResponseEntity<ApiResponse<List<LearningMaterialDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.ok(service.findAll()));
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get materials by category")
    public ResponseEntity<ApiResponse<List<LearningMaterialDto>>> findByCategory(@PathVariable MaterialCategory category) {
        return ResponseEntity.ok(ApiResponse.ok(service.findByCategory(category)));
    }

    @GetMapping("/age-group/{age}")
    @Operation(summary = "Get materials by age group")
    public ResponseEntity<ApiResponse<List<LearningMaterialDto>>> findByAgeGroup(@PathVariable AgeGroup age) {
        return ResponseEntity.ok(ApiResponse.ok(service.findByAgeGroup(age)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get material by ID")
    public ResponseEntity<ApiResponse<LearningMaterialDto>> findById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(service.findById(id)));
    }
}
