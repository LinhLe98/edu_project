package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.LearningMaterialDto;
import com.kindergarten.backend.entity.LearningMaterial;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MaterialMapper {
    @Mapping(source = "updatedAt", target = "updatedAt")
    LearningMaterialDto toDto(LearningMaterial entity);
    List<LearningMaterialDto> toDtoList(List<LearningMaterial> entities);
}
