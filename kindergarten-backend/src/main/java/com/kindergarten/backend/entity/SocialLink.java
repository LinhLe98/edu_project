package com.kindergarten.backend.entity;

import com.kindergarten.backend.enums.SocialPlatform;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "social_links")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocialLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id", nullable = false)
    private ContactInfo contact;

    @Enumerated(EnumType.STRING)
    @Column(name = "platform", length = 30, nullable = false)
    private SocialPlatform platform;

    @Column(name = "url", length = 500, nullable = false)
    private String url;

    @Column(name = "handle", length = 200)
    private String handle;
}
