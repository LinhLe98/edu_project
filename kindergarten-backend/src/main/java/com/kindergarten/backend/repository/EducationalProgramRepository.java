package com.kindergarten.backend.repository;

import com.kindergarten.backend.entity.EducationalProgram;
import com.kindergarten.backend.enums.AgeGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EducationalProgramRepository extends JpaRepository<EducationalProgram, String> {
    List<EducationalProgram> findAllByOrderByOrderIndexAsc();
    List<EducationalProgram> findByAgeGroupOrderByOrderIndexAsc(AgeGroup ageGroup);
    Optional<EducationalProgram> findBySlug(String slug);
}
