package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.FacilityDto;
import com.kindergarten.backend.dto.FacilityImageDto;
import com.kindergarten.backend.entity.Facility;
import com.kindergarten.backend.entity.FacilityImage;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FacilityMapper {
    FacilityImageDto toImageDto(FacilityImage entity);
    FacilityDto toDto(Facility entity);
    List<FacilityDto> toDtoList(List<Facility> entities);
}
