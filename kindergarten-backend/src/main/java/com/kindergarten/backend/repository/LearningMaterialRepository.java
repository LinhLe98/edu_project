package com.kindergarten.backend.repository;

import com.kindergarten.backend.entity.LearningMaterial;
import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.MaterialCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningMaterialRepository extends JpaRepository<LearningMaterial, String> {
    List<LearningMaterial> findByCategory(MaterialCategory category);
    List<LearningMaterial> findByAgeGroup(AgeGroup ageGroup);
}
