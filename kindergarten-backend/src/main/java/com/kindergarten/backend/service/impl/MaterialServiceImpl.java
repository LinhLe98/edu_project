package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.LearningMaterialDto;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.MaterialCategory;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.MaterialMapper;
import com.kindergarten.backend.repository.LearningMaterialRepository;
import com.kindergarten.backend.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MaterialServiceImpl implements MaterialService {

    private final LearningMaterialRepository repository;
    private final MaterialMapper mapper;

    @Override
    public List<LearningMaterialDto> findAll() {
        return mapper.toDtoList(repository.findAll());
    }

    @Override
    public List<LearningMaterialDto> findByCategory(MaterialCategory category) {
        return mapper.toDtoList(repository.findByCategory(category));
    }

    @Override
    public List<LearningMaterialDto> findByAgeGroup(AgeGroup ageGroup) {
        return mapper.toDtoList(repository.findByAgeGroup(ageGroup));
    }

    @Override
    public LearningMaterialDto findById(String id) {
        return mapper.toDto(
                repository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("LearningMaterial", id))
        );
    }
}
