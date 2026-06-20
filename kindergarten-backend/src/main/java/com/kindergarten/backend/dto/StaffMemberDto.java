package com.kindergarten.backend.dto;

import com.kindergarten.backend.enums.GroupRole;
import com.kindergarten.backend.enums.StaffDepartment;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class StaffMemberDto {
    String id;
    String fullName;
    String role;
    StaffDepartment department;
    String photo;
    String bio;
    boolean featured;
    GroupRole groupRole;
    String classInfo;
    int experience;
    String email;
    List<String> qualifications;
    List<String> specialties;
}
