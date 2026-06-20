package com.kindergarten.backend.unit;

import com.kindergarten.backend.common.TestDataFactory;
import com.kindergarten.backend.dto.GalleryAlbumDto;
import com.kindergarten.backend.entity.GalleryAlbum;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.AlbumCategory;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.GalleryMapper;
import com.kindergarten.backend.repository.GalleryAlbumRepository;
import com.kindergarten.backend.service.impl.GalleryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GalleryServiceTest {

    @Mock
    private GalleryAlbumRepository repository;

    @Mock
    private GalleryMapper mapper;

    @InjectMocks
    private GalleryServiceImpl service;

    @Test
    void findAll_returnsAllAlbums() {
        List<GalleryAlbum> albums = List.of(
                TestDataFactory.galleryAlbum("album-1", AgeGroup.THREE_TUOI, AlbumCategory.HOAT_DONG_HOC),
                TestDataFactory.galleryAlbum("album-2", AgeGroup.FOUR_TUOI, AlbumCategory.VUI_CHOI)
        );
        List<GalleryAlbumDto> dtos = List.of(
                GalleryAlbumDto.builder().id("album-1").ageGroup(AgeGroup.THREE_TUOI).category(AlbumCategory.HOAT_DONG_HOC).build(),
                GalleryAlbumDto.builder().id("album-2").ageGroup(AgeGroup.FOUR_TUOI).category(AlbumCategory.VUI_CHOI).build()
        );

        when(repository.findAll()).thenReturn(albums);
        when(mapper.toAlbumDtoList(albums)).thenReturn(dtos);

        List<GalleryAlbumDto> result = service.findAll();

        assertThat(result).hasSize(2);
    }

    @Test
    void findByAgeGroup_returnsFilteredAlbums() {
        List<GalleryAlbum> albums = List.of(
                TestDataFactory.galleryAlbum("album-1", AgeGroup.THREE_TUOI, AlbumCategory.HOAT_DONG_HOC)
        );
        List<GalleryAlbumDto> dtos = List.of(
                GalleryAlbumDto.builder().id("album-1").ageGroup(AgeGroup.THREE_TUOI).category(AlbumCategory.HOAT_DONG_HOC).build()
        );

        when(repository.findByAgeGroup(AgeGroup.THREE_TUOI)).thenReturn(albums);
        when(mapper.toAlbumDtoList(albums)).thenReturn(dtos);

        List<GalleryAlbumDto> result = service.findByAgeGroup(AgeGroup.THREE_TUOI);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getAgeGroup()).isEqualTo(AgeGroup.THREE_TUOI);
    }

    @Test
    void findById_returnsAlbum_whenFound() {
        GalleryAlbum album = TestDataFactory.galleryAlbum("album-1", AgeGroup.THREE_TUOI, AlbumCategory.HOAT_DONG_HOC);
        GalleryAlbumDto dto = GalleryAlbumDto.builder().id("album-1").ageGroup(AgeGroup.THREE_TUOI).category(AlbumCategory.HOAT_DONG_HOC).build();

        when(repository.findById("album-1")).thenReturn(Optional.of(album));
        when(mapper.toAlbumDto(album)).thenReturn(dto);

        GalleryAlbumDto result = service.findById("album-1");

        assertThat(result.getId()).isEqualTo("album-1");
    }

    @Test
    void findById_throwsNotFound_whenMissing() {
        when(repository.findById("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById("nonexistent"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
