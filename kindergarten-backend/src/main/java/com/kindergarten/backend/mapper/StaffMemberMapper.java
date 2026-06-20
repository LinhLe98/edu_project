package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.StaffMemberDto;
import com.kindergarten.backend.entity.StaffMember;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StaffMemberMapper {
    StaffMemberDto toDto(StaffMember entity);
    List<StaffMemberDto> toDtoList(List<StaffMember> entities);
}
