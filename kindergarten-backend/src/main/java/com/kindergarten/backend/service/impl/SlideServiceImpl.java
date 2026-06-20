package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.HeroSlideDto;
import com.kindergarten.backend.mapper.HeroSlideMapper;
import com.kindergarten.backend.repository.HeroSlideRepository;
import com.kindergarten.backend.service.SlideService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SlideServiceImpl implements SlideService {

    private final HeroSlideRepository repository;
    private final HeroSlideMapper mapper;

    @Override
    public List<HeroSlideDto> findAll() {
        return mapper.toDtoList(repository.findAllByOrderByOrderIndexAsc());
    }
}
