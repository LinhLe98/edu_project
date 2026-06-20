package com.kindergarten.backend.controller;

import com.kindergarten.backend.dto.ApiResponse;
import com.kindergarten.backend.dto.StaffMemberDto;
import com.kindergarten.backend.enums.StaffDepartment;
import com.kindergarten.backend.service.StaffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
@Tag(name = "Staff", description = "Staff members management")
public class StaffController {

    private final StaffService service;

    @GetMapping
    @Operation(summary = "Get all staff members")
    public ResponseEntity<ApiResponse<List<StaffMemberDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.ok(service.findAll()));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured staff members")
    public ResponseEntity<ApiResponse<List<StaffMemberDto>>> findFeatured() {
        return ResponseEntity.ok(ApiResponse.ok(service.findFeatured()));
    }

    @GetMapping("/management")
    @Operation(summary = "Get management team (Ban Giám Hiệu)")
    public ResponseEntity<ApiResponse<List<StaffMemberDto>>> findManagement() {
        return ResponseEntity.ok(ApiResponse.ok(service.findManagement()));
    }

    @GetMapping("/teachers")
    @Operation(summary = "Get all teachers")
    public ResponseEntity<ApiResponse<List<StaffMemberDto>>> findTeachers() {
        return ResponseEntity.ok(ApiResponse.ok(service.findTeachers()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get staff member by ID")
    public ResponseEntity<ApiResponse<StaffMemberDto>> findById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(service.findById(id)));
    }

    @GetMapping("/department/{dept}")
    @Operation(summary = "Get staff members by department slug")
    public ResponseEntity<ApiResponse<List<StaffMemberDto>>> findByDepartment(@PathVariable StaffDepartment dept) {
        return ResponseEntity.ok(ApiResponse.ok(service.findByDepartment(dept)));
    }

    @GetMapping("/department/{dept}/leader")
    @Operation(summary = "Get department leader")
    public ResponseEntity<ApiResponse<StaffMemberDto>> findDepartmentLeader(@PathVariable StaffDepartment dept) {
        return ResponseEntity.ok(ApiResponse.ok(service.findDepartmentLeader(dept)));
    }

    @GetMapping("/department/{dept}/vice-leaders")
    @Operation(summary = "Get department vice-leaders")
    public ResponseEntity<ApiResponse<List<StaffMemberDto>>> findDepartmentViceLeaders(@PathVariable StaffDepartment dept) {
        return ResponseEntity.ok(ApiResponse.ok(service.findDepartmentViceLeaders(dept)));
    }
}
