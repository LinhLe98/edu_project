package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.StaffMemberDto;
import com.kindergarten.backend.enums.GroupRole;
import com.kindergarten.backend.enums.StaffDepartment;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.StaffMemberMapper;
import com.kindergarten.backend.repository.StaffMemberRepository;
import com.kindergarten.backend.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StaffServiceImpl implements StaffService {

    private final StaffMemberRepository repository;
    private final StaffMemberMapper mapper;

    @Override
    public List<StaffMemberDto> findAll() {
        return mapper.toDtoList(repository.findAll());
    }

    @Override
    public List<StaffMemberDto> findFeatured() {
        return mapper.toDtoList(repository.findByFeaturedTrue());
    }

    @Override
    public List<StaffMemberDto> findManagement() {
        return mapper.toDtoList(
                repository.findByDepartmentIn(List.of(StaffDepartment.BAN_GIAM_HIEU))
        );
    }

    @Override
    public List<StaffMemberDto> findTeachers() {
        return mapper.toDtoList(
                repository.findByDepartmentNotIn(List.of(StaffDepartment.BAN_GIAM_HIEU, StaffDepartment.TO_NHAN_VIEN))
        );
    }

    @Override
    public StaffMemberDto findById(String id) {
        return mapper.toDto(
                repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StaffMember", id))
        );
    }

    @Override
    public List<StaffMemberDto> findByDepartment(StaffDepartment department) {
        return mapper.toDtoList(repository.findByDepartment(department));
    }

    @Override
    public StaffMemberDto findDepartmentLeader(StaffDepartment department) {
        return mapper.toDto(
                repository.findByDepartmentAndGroupRole(department, GroupRole.LEADER)
                        .orElseThrow(() -> new ResourceNotFoundException("Leader for department", department.getSlug()))
        );
    }

    @Override
    public List<StaffMemberDto> findDepartmentViceLeaders(StaffDepartment department) {
        return mapper.toDtoList(
                repository.findByDepartmentAndGroupRoleIn(department, List.of(GroupRole.VICE_LEADER))
        );
    }
}
