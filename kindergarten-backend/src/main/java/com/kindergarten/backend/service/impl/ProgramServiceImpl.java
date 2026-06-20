package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.EducationalProgramDto;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.ProgramMapper;
import com.kindergarten.backend.repository.EducationalProgramRepository;
import com.kindergarten.backend.service.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProgramServiceImpl implements ProgramService {

    private final EducationalProgramRepository repository;
    private final ProgramMapper mapper;

    @Override
    public List<EducationalProgramDto> findAll() {
        return mapper.toDtoList(repository.findAllByOrderByOrderIndexAsc());
    }

    @Override
    public List<EducationalProgramDto> findByAgeGroup(AgeGroup ageGroup) {
        return mapper.toDtoList(repository.findByAgeGroupOrderByOrderIndexAsc(ageGroup));
    }

    @Override
    public EducationalProgramDto findBySlug(String slug) {
        return mapper.toDto(
                repository.findBySlug(slug)
                        .orElseThrow(() -> new ResourceNotFoundException("EducationalProgram", slug))
        );
    }
}
