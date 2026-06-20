package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.EducationalProgramDto;
import com.kindergarten.backend.enums.AgeGroup;

import java.util.List;

public interface ProgramService {
    List<EducationalProgramDto> findAll();
    List<EducationalProgramDto> findByAgeGroup(AgeGroup ageGroup);
    EducationalProgramDto findBySlug(String slug);
}
