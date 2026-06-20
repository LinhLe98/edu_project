package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.FacilityDto;
import com.kindergarten.backend.service.FacilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/facilities")
@RequiredArgsConstructor
@Tag(name = "Facilities", description = "School facilities")
public class FacilityController {

    private final FacilityService service;

    @GetMapping
    @Operation(summary = "Get all facilities with images")
    public ResponseEntity<ApiResponse<List<FacilityDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.ok(service.findAll()));
    }
}
