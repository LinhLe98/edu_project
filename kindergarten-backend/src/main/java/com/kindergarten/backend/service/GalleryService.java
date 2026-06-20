package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.GalleryAlbumDto;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.AlbumCategory;

import java.util.List;

public interface GalleryService {
    List<GalleryAlbumDto> findAll();
    List<GalleryAlbumDto> findByAgeGroup(AgeGroup ageGroup);
    List<GalleryAlbumDto> findByCategory(AlbumCategory category);
    GalleryAlbumDto findById(String id);
}
