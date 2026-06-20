package com.kindergarten.backend.unit;

import com.kindergarten.backend.common.TestDataFactory;
import com.kindergarten.backend.dto.LearningMaterialDto;
import com.kindergarten.backend.entity.LearningMaterial;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.MaterialCategory;
import com.kindergarten.backend.enums.MaterialType;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.MaterialMapper;
import com.kindergarten.backend.repository.LearningMaterialRepository;
import com.kindergarten.backend.service.impl.MaterialServiceImpl;
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
class MaterialServiceTest {

    @Mock
    private LearningMaterialRepository repository;

    @Mock
    private MaterialMapper mapper;

    @InjectMocks
    private MaterialServiceImpl service;

    @Test
    void findAll_returnsAllMaterials() {
        List<LearningMaterial> materials = List.of(
                TestDataFactory.learningMaterial("mat-1", MaterialCategory.THUC_DON, AgeGroup.ALL),
                TestDataFactory.learningMaterial("mat-2", MaterialCategory.LICH_HOC, AgeGroup.ALL)
        );
        List<LearningMaterialDto> dtos = List.of(
                LearningMaterialDto.builder().id("mat-1").category(MaterialCategory.THUC_DON).type(MaterialType.PDF).build(),
                LearningMaterialDto.builder().id("mat-2").category(MaterialCategory.LICH_HOC).type(MaterialType.PDF).build()
        );

        when(repository.findAll()).thenReturn(materials);
        when(mapper.toDtoList(materials)).thenReturn(dtos);

        List<LearningMaterialDto> result = service.findAll();

        assertThat(result).hasSize(2);
    }

    @Test
    void findByCategory_returnsFilteredMaterials() {
        List<LearningMaterial> materials = List.of(
                TestDataFactory.learningMaterial("mat-1", MaterialCategory.THUC_DON, AgeGroup.ALL)
        );
        List<LearningMaterialDto> dtos = List.of(
                LearningMaterialDto.builder().id("mat-1").category(MaterialCategory.THUC_DON).type(MaterialType.PDF).build()
        );

        when(repository.findByCategory(MaterialCategory.THUC_DON)).thenReturn(materials);
        when(mapper.toDtoList(materials)).thenReturn(dtos);

        List<LearningMaterialDto> result = service.findByCategory(MaterialCategory.THUC_DON);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getCategory()).isEqualTo(MaterialCategory.THUC_DON);
    }

    @Test
    void findById_returnsMaterial_whenFound() {
        LearningMaterial material = TestDataFactory.learningMaterial("mat-1", MaterialCategory.THUC_DON, AgeGroup.ALL);
        LearningMaterialDto dto = LearningMaterialDto.builder().id("mat-1").category(MaterialCategory.THUC_DON).type(MaterialType.PDF).build();

        when(repository.findById("mat-1")).thenReturn(Optional.of(material));
        when(mapper.toDto(material)).thenReturn(dto);

        LearningMaterialDto result = service.findById("mat-1");

        assertThat(result.getId()).isEqualTo("mat-1");
    }

    @Test
    void findById_throwsNotFound_whenMissing() {
        when(repository.findById("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById("nonexistent"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
