package com.kindergarten.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "working_hours")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkingHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id", nullable = false)
    private ContactInfo contact;

    @Column(name = "label", length = 200, nullable = false)
    private String label;

    @Column(name = "hours", length = 100, nullable = false)
    private String hours;
}
