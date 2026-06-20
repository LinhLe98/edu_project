package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.GalleryAlbumDto;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.AlbumCategory;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.GalleryMapper;
import com.kindergarten.backend.repository.GalleryAlbumRepository;
import com.kindergarten.backend.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GalleryServiceImpl implements GalleryService {

    private final GalleryAlbumRepository repository;
    private final GalleryMapper mapper;

    @Override
    public List<GalleryAlbumDto> findAll() {
        return mapper.toAlbumDtoList(repository.findAll());
    }

    @Override
    public List<GalleryAlbumDto> findByAgeGroup(AgeGroup ageGroup) {
        return mapper.toAlbumDtoList(repository.findByAgeGroup(ageGroup));
    }

    @Override
    public List<GalleryAlbumDto> findByCategory(AlbumCategory category) {
        return mapper.toAlbumDtoList(repository.findByCategory(category));
    }

    @Override
    public GalleryAlbumDto findById(String id) {
        return mapper.toAlbumDto(
                repository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("GalleryAlbum", id))
        );
    }
}
