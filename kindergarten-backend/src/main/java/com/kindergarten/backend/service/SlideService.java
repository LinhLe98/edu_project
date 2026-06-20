package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.HeroSlideDto;

import java.util.List;

public interface SlideService {
    List<HeroSlideDto> findAll();
}
