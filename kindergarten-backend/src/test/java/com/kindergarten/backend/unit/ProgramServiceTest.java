package com.kindergarten.backend.unit;

import com.kindergarten.backend.common.TestDataFactory;
import com.kindergarten.backend.dto.EducationalProgramDto;
import com.kindergarten.backend.entity.EducationalProgram;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.ProgramMapper;
import com.kindergarten.backend.repository.EducationalProgramRepository;
import com.kindergarten.backend.service.impl.ProgramServiceImpl;
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
class ProgramServiceTest {

    @Mock
    private EducationalProgramRepository repository;

    @Mock
    private ProgramMapper mapper;

    @InjectMocks
    private ProgramServiceImpl service;

    @Test
    void findAll_returnsAllPrograms() {
        List<EducationalProgram> programs = List.of(
                TestDataFactory.educationalProgram("prog-1", "slug-1", AgeGroup.ALL),
                TestDataFactory.educationalProgram("prog-2", "slug-2", AgeGroup.FOUR_TUOI)
        );
        List<EducationalProgramDto> dtos = List.of(
                EducationalProgramDto.builder().id("prog-1").slug("slug-1").ageGroup(AgeGroup.ALL).orderIndex(1).build(),
                EducationalProgramDto.builder().id("prog-2").slug("slug-2").ageGroup(AgeGroup.FOUR_TUOI).orderIndex(2).build()
        );

        when(repository.findAllByOrderByOrderIndexAsc()).thenReturn(programs);
        when(mapper.toDtoList(programs)).thenReturn(dtos);

        List<EducationalProgramDto> result = service.findAll();

        assertThat(result).hasSize(2);
    }

    @Test
    void findByAgeGroup_returnsFilteredPrograms() {
        List<EducationalProgram> programs = List.of(
                TestDataFactory.educationalProgram("prog-4", "slug-4", AgeGroup.FOUR_TUOI)
        );
        List<EducationalProgramDto> dtos = List.of(
                EducationalProgramDto.builder().id("prog-4").slug("slug-4").ageGroup(AgeGroup.FOUR_TUOI).orderIndex(1).build()
        );

        when(repository.findByAgeGroupOrderByOrderIndexAsc(AgeGroup.FOUR_TUOI)).thenReturn(programs);
        when(mapper.toDtoList(programs)).thenReturn(dtos);

        List<EducationalProgramDto> result = service.findByAgeGroup(AgeGroup.FOUR_TUOI);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getAgeGroup()).isEqualTo(AgeGroup.FOUR_TUOI);
    }

    @Test
    void findBySlug_returnsProgram_whenFound() {
        EducationalProgram program = TestDataFactory.educationalProgram("prog-1", "phat-trien-ngon-ngu", AgeGroup.ALL);
        EducationalProgramDto dto = EducationalProgramDto.builder().id("prog-1").slug("phat-trien-ngon-ngu").ageGroup(AgeGroup.ALL).orderIndex(1).build();

        when(repository.findBySlug("phat-trien-ngon-ngu")).thenReturn(Optional.of(program));
        when(mapper.toDto(program)).thenReturn(dto);

        EducationalProgramDto result = service.findBySlug("phat-trien-ngon-ngu");

        assertThat(result.getSlug()).isEqualTo("phat-trien-ngon-ngu");
    }

    @Test
    void findBySlug_throwsNotFound_whenMissing() {
        when(repository.findBySlug("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findBySlug("nonexistent"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
