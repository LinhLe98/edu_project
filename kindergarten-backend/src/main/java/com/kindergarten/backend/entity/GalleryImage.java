package com.kindergarten.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gallery_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GalleryImage {

    @Id
    @Column(name = "id", length = 100)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id", nullable = false)
    private GalleryAlbum album;

    @Column(name = "src", length = 500, nullable = false)
    private String src;

    @Column(name = "alt", length = 300)
    private String alt;

    @Column(name = "caption", length = 500)
    private String caption;

    @Column(name = "width", nullable = false)
    private int width;

    @Column(name = "height", nullable = false)
    private int height;
}
