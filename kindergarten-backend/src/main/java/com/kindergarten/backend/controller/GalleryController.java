package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.GalleryAlbumDto;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.AlbumCategory;
import com.kindergarten.backend.service.GalleryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gallery")
@RequiredArgsConstructor
@Tag(name = "Gallery", description = "Photo gallery albums")
public class GalleryController {

    private final GalleryService service;

    @GetMapping("/albums")
    @Operation(summary = "Get all gallery albums")
    public ResponseEntity<ApiResponse<List<GalleryAlbumDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.ok(service.findAll()));
    }

    @GetMapping("/albums/age-group/{age}")
    @Operation(summary = "Get albums by age group")
    public ResponseEntity<ApiResponse<List<GalleryAlbumDto>>> findByAgeGroup(@PathVariable AgeGroup age) {
        return ResponseEntity.ok(ApiResponse.ok(service.findByAgeGroup(age)));
    }

    @GetMapping("/albums/category/{category}")
    @Operation(summary = "Get albums by category")
    public ResponseEntity<ApiResponse<List<GalleryAlbumDto>>> findByCategory(@PathVariable AlbumCategory category) {
        return ResponseEntity.ok(ApiResponse.ok(service.findByCategory(category)));
    }

    @GetMapping("/albums/{id}")
    @Operation(summary = "Get album by ID")
    public ResponseEntity<ApiResponse<GalleryAlbumDto>> findById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(service.findById(id)));
    }
}
