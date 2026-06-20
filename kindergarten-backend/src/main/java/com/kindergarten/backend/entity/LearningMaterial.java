package com.kindergarten.backend.entity;

import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.MaterialCategory;
import com.kindergarten.backend.enums.MaterialType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "learning_materials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningMaterial extends BaseAuditEntity {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "title", length = 300, nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", length = 20, nullable = false)
    private MaterialType type;

    @Column(name = "icon", length = 20)
    private String icon;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", length = 50, nullable = false)
    private MaterialCategory category;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "size", length = 50)
    private String size;

    @Enumerated(EnumType.STRING)
    @Column(name = "age_group", length = 20)
    private AgeGroup ageGroup;
}
