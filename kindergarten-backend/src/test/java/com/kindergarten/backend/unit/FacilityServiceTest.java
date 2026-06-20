package com.kindergarten.backend.unit;

import com.kindergarten.backend.common.TestDataFactory;
import com.kindergarten.backend.dto.FacilityDto;
import com.kindergarten.backend.entity.Facility;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.FacilityMapper;
import com.kindergarten.backend.repository.FacilityRepository;
import com.kindergarten.backend.service.impl.FacilityServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FacilityServiceTest {

    @Mock
    private FacilityRepository repository;

    @Mock
    private FacilityMapper mapper;

    @InjectMocks
    private FacilityServiceImpl service;

    @Test
    void findAll_returnsAllFacilities() {
        List<Facility> facilities = List.of(
                TestDataFactory.facility("facility-1"),
                TestDataFactory.facility("facility-2")
        );
        List<FacilityDto> dtos = List.of(
                FacilityDto.builder().id("facility-1").name("Phòng Học").iconEmoji("🏫").build(),
                FacilityDto.builder().id("facility-2").name("Sân Chơi").iconEmoji("🌳").build()
        );

        when(repository.findAll()).thenReturn(facilities);
        when(mapper.toDtoList(facilities)).thenReturn(dtos);

        List<FacilityDto> result = service.findAll();

        assertThat(result).hasSize(2);
    }

    @Test
    void findById_returnsFacility_whenFound() {
        Facility facility = TestDataFactory.facility("facility-1");
        FacilityDto dto = FacilityDto.builder().id("facility-1").name("Phòng Học").iconEmoji("🏫").build();

        when(repository.findById("facility-1")).thenReturn(Optional.of(facility));
        when(mapper.toDto(facility)).thenReturn(dto);

        FacilityDto result = service.findById("facility-1");

        assertThat(result.getId()).isEqualTo("facility-1");
    }

    @Test
    void findById_throwsNotFound_whenMissing() {
        when(repository.findById("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById("nonexistent"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
