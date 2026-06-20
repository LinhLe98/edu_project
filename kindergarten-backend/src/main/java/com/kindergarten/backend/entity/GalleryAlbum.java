package com.kindergarten.backend.entity;

import com.kindergarten.backend.enums.AgeGroup;
import com.kindergarten.backend.enums.AlbumCategory;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "gallery_albums")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GalleryAlbum extends BaseAuditEntity {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "title", length = 300, nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "cover_image", length = 500)
    private String coverImage;

    @Enumerated(EnumType.STRING)
    @Column(name = "age_group", length = 20)
    private AgeGroup ageGroup;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", length = 50, nullable = false)
    private AlbumCategory category;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<GalleryImage> images = new ArrayList<>();
}
