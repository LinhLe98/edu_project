package com.kindergarten.backend.entity;

import com.kindergarten.backend.enums.AgeGroup;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "educational_programs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationalProgram extends BaseAuditEntity {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "title", length = 300, nullable = false)
    private String title;

    @Column(name = "slug", length = 300, nullable = false, unique = true)
    private String slug;

    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    @Column(name = "full_description", columnDefinition = "TEXT")
    private String fullDescription;

    @Column(name = "cover_image", length = 500)
    private String coverImage;

    @Column(name = "icon_emoji", length = 20)
    private String iconEmoji;

    @Enumerated(EnumType.STRING)
    @Column(name = "age_group", length = 20, nullable = false)
    private AgeGroup ageGroup;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;

    @Column(name = "long_description", columnDefinition = "TEXT")
    private String longDescription;

    @Column(name = "weekly_schedule", length = 200)
    private String weeklySchedule;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "program_outcomes", joinColumns = @JoinColumn(name = "program_id"))
    @Column(name = "outcome", length = 500)
    @Builder.Default
    private List<String> outcomes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "program_featured_images", joinColumns = @JoinColumn(name = "program_id"))
    @Column(name = "image_url", length = 500)
    @Builder.Default
    private List<String> featuredImages = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "program_albums",
            joinColumns = @JoinColumn(name = "program_id"),
            inverseJoinColumns = @JoinColumn(name = "album_id")
    )
    @Builder.Default
    private Set<GalleryAlbum> albums = new HashSet<>();
}
