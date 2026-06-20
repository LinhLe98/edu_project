package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.StaffMemberDto;
import com.kindergarten.backend.enums.StaffDepartment;

import java.util.List;

public interface StaffService {
    List<StaffMemberDto> findAll();
    List<StaffMemberDto> findFeatured();
    List<StaffMemberDto> findManagement();
    List<StaffMemberDto> findTeachers();
    StaffMemberDto findById(String id);
    List<StaffMemberDto> findByDepartment(StaffDepartment department);
    StaffMemberDto findDepartmentLeader(StaffDepartment department);
    List<StaffMemberDto> findDepartmentViceLeaders(StaffDepartment department);
}
