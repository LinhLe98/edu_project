package com.kindergarten.backend.unit;

import com.kindergarten.backend.common.TestDataFactory;
import com.kindergarten.backend.dto.StaffMemberDto;
import com.kindergarten.backend.entity.StaffMember;
import com.kindergarten.backend.enums.GroupRole;
import com.kindergarten.backend.enums.StaffDepartment;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.StaffMemberMapper;
import com.kindergarten.backend.repository.StaffMemberRepository;
import com.kindergarten.backend.service.impl.StaffServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StaffServiceTest {

    @Mock
    private StaffMemberRepository repository;

    @Mock
    private StaffMemberMapper mapper;

    @InjectMocks
    private StaffServiceImpl service;

    @Test
    void findAll_returnsAllStaff() {
        List<StaffMember> staff = List.of(
                TestDataFactory.staffMember("staff-1", StaffDepartment.BAN_GIAM_HIEU),
                TestDataFactory.staffMember("staff-2", StaffDepartment.TO_GIAO_VIEN_LA)
        );
        List<StaffMemberDto> dtos = List.of(
                StaffMemberDto.builder().id("staff-1").fullName("Test 1").department(StaffDepartment.BAN_GIAM_HIEU).experience(5).build(),
                StaffMemberDto.builder().id("staff-2").fullName("Test 2").department(StaffDepartment.TO_GIAO_VIEN_LA).experience(5).build()
        );
        when(repository.findAll()).thenReturn(staff);
        when(mapper.toDtoList(staff)).thenReturn(dtos);

        List<StaffMemberDto> result = service.findAll();

        assertThat(result).hasSize(2);
    }

    @Test
    void findById_returnsStaff_whenExists() {
        StaffMember staff = TestDataFactory.staffMember("staff-1", StaffDepartment.BAN_GIAM_HIEU);
        StaffMemberDto dto = StaffMemberDto.builder().id("staff-1").fullName("Test").department(StaffDepartment.BAN_GIAM_HIEU).experience(5).build();
        when(repository.findById("staff-1")).thenReturn(Optional.of(staff));
        when(mapper.toDto(staff)).thenReturn(dto);

        StaffMemberDto result = service.findById("staff-1");

        assertThat(result.getId()).isEqualTo("staff-1");
    }

    @Test
    void findById_throwsNotFound_whenMissing() {
        when(repository.findById("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById("nonexistent"))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void findFeatured_returnsFeaturedStaff() {
        StaffMember leader = TestDataFactory.staffLeader("staff-1", StaffDepartment.BAN_GIAM_HIEU);
        List<StaffMember> featured = List.of(leader);
        List<StaffMemberDto> dtos = List.of(
                StaffMemberDto.builder().id("staff-1").fullName("Leader").featured(true).department(StaffDepartment.BAN_GIAM_HIEU).experience(10).build()
        );
        when(repository.findByFeaturedTrue()).thenReturn(featured);
        when(mapper.toDtoList(featured)).thenReturn(dtos);

        List<StaffMemberDto> result = service.findFeatured();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).isFeatured()).isTrue();
    }

    @Test
    void findDepartmentLeader_returnsLeader_whenExists() {
        StaffMember leader = TestDataFactory.staffLeader("staff-3", StaffDepartment.TO_GIAO_VIEN_LA);
        StaffMemberDto dto = StaffMemberDto.builder().id("staff-3").groupRole(GroupRole.LEADER).department(StaffDepartment.TO_GIAO_VIEN_LA).experience(10).build();
        when(repository.findByDepartmentAndGroupRole(StaffDepartment.TO_GIAO_VIEN_LA, GroupRole.LEADER))
                .thenReturn(Optional.of(leader));
        when(mapper.toDto(leader)).thenReturn(dto);

        StaffMemberDto result = service.findDepartmentLeader(StaffDepartment.TO_GIAO_VIEN_LA);

        assertThat(result.getGroupRole()).isEqualTo(GroupRole.LEADER);
    }

    @Test
    void findDepartmentLeader_throwsNotFound_whenNoLeader() {
        when(repository.findByDepartmentAndGroupRole(eq(StaffDepartment.TO_NHAN_VIEN), eq(GroupRole.LEADER)))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findDepartmentLeader(StaffDepartment.TO_NHAN_VIEN))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
