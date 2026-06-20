package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.EducationalProgramDto;
import com.kindergarten.backend.dto.ProgramAlbumRefDto;
import com.kindergarten.backend.entity.EducationalProgram;
import com.kindergarten.backend.entity.GalleryAlbum;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProgramMapper {
    ProgramAlbumRefDto toAlbumRef(GalleryAlbum album);

    EducationalProgramDto toDto(EducationalProgram entity);

    List<EducationalProgramDto> toDtoList(List<EducationalProgram> entities);
}
