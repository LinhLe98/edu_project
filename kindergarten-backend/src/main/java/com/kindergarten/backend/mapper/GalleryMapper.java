package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.GalleryAlbumDto;
import com.kindergarten.backend.dto.GalleryImageDto;
import com.kindergarten.backend.entity.GalleryAlbum;
import com.kindergarten.backend.entity.GalleryImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GalleryMapper {
    GalleryImageDto toImageDto(GalleryImage entity);

    @Mapping(source = "createdAt", target = "createdAt")
    GalleryAlbumDto toAlbumDto(GalleryAlbum entity);

    List<GalleryAlbumDto> toAlbumDtoList(List<GalleryAlbum> entities);
}
