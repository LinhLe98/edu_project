package com.kindergarten.backend.repository;

import com.kindergarten.backend.entity.HeroSlide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroSlideRepository extends JpaRepository<HeroSlide, String> {
    List<HeroSlide> findAllByOrderByOrderIndexAsc();
}
