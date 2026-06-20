package com.kindergarten.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "contact_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactInfo extends BaseAuditEntity {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "school_name", length = 300, nullable = false)
    private String schoolName;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "district", length = 200)
    private String district;

    @Column(name = "city", length = 200)
    private String city;

    @Column(name = "email", length = 200)
    private String email;

    @Column(name = "google_maps_embed_url", columnDefinition = "TEXT")
    private String googleMapsEmbedUrl;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "contact_phones", joinColumns = @JoinColumn(name = "contact_id"))
    @Column(name = "phone", length = 50)
    @Builder.Default
    private List<String> phones = new ArrayList<>();

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<WorkingHours> workingHours = new ArrayList<>();

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<SocialLink> socialLinks = new ArrayList<>();
}
