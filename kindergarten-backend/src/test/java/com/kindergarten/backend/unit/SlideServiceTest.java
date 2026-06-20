package com.kindergarten.backend.unit;

import com.kindergarten.backend.common.TestDataFactory;
import com.kindergarten.backend.dto.HeroSlideDto;
import com.kindergarten.backend.entity.HeroSlide;
import com.kindergarten.backend.mapper.HeroSlideMapper;
import com.kindergarten.backend.repository.HeroSlideRepository;
import com.kindergarten.backend.service.impl.SlideServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SlideServiceTest {

    @Mock
    private HeroSlideRepository repository;

    @Mock
    private HeroSlideMapper mapper;

    @InjectMocks
    private SlideServiceImpl service;

    @Test
    void findAll_returnsAllSlides() {
        List<HeroSlide> slides = List.of(
                TestDataFactory.heroSlide("slide-1"),
                TestDataFactory.heroSlide("slide-2")
        );
        List<HeroSlideDto> dtos = List.of(
                HeroSlideDto.builder().id("slide-1").heading("H1").imageUrl("url1").orderIndex(1).build(),
                HeroSlideDto.builder().id("slide-2").heading("H2").imageUrl("url2").orderIndex(2).build()
        );

        when(repository.findAllByOrderByOrderIndexAsc()).thenReturn(slides);
        when(mapper.toDtoList(slides)).thenReturn(dtos);

        List<HeroSlideDto> result = service.findAll();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getId()).isEqualTo("slide-1");
        assertThat(result.get(1).getId()).isEqualTo("slide-2");
    }

    @Test
    void findAll_returnsEmptyList_whenNoSlides() {
        when(repository.findAllByOrderByOrderIndexAsc()).thenReturn(List.of());
        when(mapper.toDtoList(List.of())).thenReturn(List.of());

        List<HeroSlideDto> result = service.findAll();

        assertThat(result).isEmpty();
    }
}
