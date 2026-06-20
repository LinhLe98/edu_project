package com.kindergarten.backend.repository;

import com.kindergarten.backend.entity.StaffMember;
import com.kindergarten.backend.enums.GroupRole;
import com.kindergarten.backend.enums.StaffDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffMemberRepository extends JpaRepository<StaffMember, String> {
    List<StaffMember> findByFeaturedTrue();
    List<StaffMember> findByDepartmentIn(List<StaffDepartment> departments);
    List<StaffMember> findByDepartmentNotIn(List<StaffDepartment> departments);
    List<StaffMember> findByDepartment(StaffDepartment department);
    Optional<StaffMember> findByDepartmentAndGroupRole(StaffDepartment department, GroupRole groupRole);
    List<StaffMember> findByDepartmentAndGroupRoleIn(StaffDepartment department, List<GroupRole> roles);
}
