package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.HeroSlideDto;
import com.kindergarten.backend.entity.HeroSlide;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HeroSlideMapper {
    HeroSlideDto toDto(HeroSlide entity);
    List<HeroSlideDto> toDtoList(List<HeroSlide> entities);
}
