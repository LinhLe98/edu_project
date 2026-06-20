package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.FacilityDto;

import java.util.List;

public interface FacilityService {
    List<FacilityDto> findAll();
    FacilityDto findById(String id);
}
