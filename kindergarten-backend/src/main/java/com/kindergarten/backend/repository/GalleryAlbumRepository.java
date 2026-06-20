package com.kindergarten.backend.repository;

import com.kindergarten.backend.entity.GalleryAlbum;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.AlbumCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryAlbumRepository extends JpaRepository<GalleryAlbum, String> {
    List<GalleryAlbum> findByAgeGroup(AgeGroup ageGroup);
    List<GalleryAlbum> findByCategory(AlbumCategory category);
}
