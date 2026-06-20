package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.LearningMaterialDto;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.MaterialCategory;

import java.util.List;

public interface MaterialService {
    List<LearningMaterialDto> findAll();
    List<LearningMaterialDto> findByCategory(MaterialCategory category);
    List<LearningMaterialDto> findByAgeGroup(AgeGroup ageGroup);
    LearningMaterialDto findById(String id);
}
