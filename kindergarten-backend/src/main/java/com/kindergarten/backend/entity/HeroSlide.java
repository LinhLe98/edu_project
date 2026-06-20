package com.kindergarten.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hero_slides")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeroSlide extends BaseAuditEntity {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "image_url", length = 500, nullable = false)
    private String imageUrl;

    @Column(name = "alt_text", length = 300)
    private String altText;

    @Column(name = "heading", length = 300)
    private String heading;

    @Column(name = "subheading", length = 500)
    private String subheading;

    @Column(name = "cta_label", length = 100)
    private String ctaLabel;

    @Column(name = "cta_link", length = 300)
    private String ctaLink;

    @Column(name = "cta_fragment", length = 200)
    private String ctaFragment;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;
}
