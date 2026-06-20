package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.FacilityDto;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.FacilityMapper;
import com.kindergarten.backend.repository.FacilityRepository;
import com.kindergarten.backend.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FacilityServiceImpl implements FacilityService {

    private final FacilityRepository repository;
    private final FacilityMapper mapper;

    @Override
    public List<FacilityDto> findAll() {
        return mapper.toDtoList(repository.findAll());
    }

    @Override
    public FacilityDto findById(String id) {
        return mapper.toDto(
                repository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Facility", id))
        );
    }
}
