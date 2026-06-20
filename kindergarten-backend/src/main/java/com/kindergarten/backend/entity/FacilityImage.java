package com.kindergarten.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "facility_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacilityImage {

    @Id
    @Column(name = "id", length = 100)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id", nullable = false)
    private Facility facility;

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
