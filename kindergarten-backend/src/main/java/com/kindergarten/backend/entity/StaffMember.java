package com.kindergarten.backend.entity;

import com.kindergarten.backend.enums.GroupRole;
import com.kindergarten.backend.enums.StaffDepartment;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "staff_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffMember extends BaseAuditEntity {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "full_name", length = 200, nullable = false)
    private String fullName;

    @Column(name = "role", length = 200)
    private String role;

    @Enumerated(EnumType.STRING)
    @Column(name = "department", length = 50, nullable = false)
    private StaffDepartment department;

    @Column(name = "photo", length = 500)
    private String photo;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "featured", nullable = false)
    private boolean featured;

    @Enumerated(EnumType.STRING)
    @Column(name = "group_role", length = 30)
    private GroupRole groupRole;

    @Column(name = "class_info", length = 200)
    private String classInfo;

    @Column(name = "experience", nullable = false)
    private int experience;

    @Column(name = "email", length = 200)
    private String email;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "staff_qualifications", joinColumns = @JoinColumn(name = "staff_id"))
    @Column(name = "qualification", length = 300)
    @Builder.Default
    private List<String> qualifications = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "staff_specialties", joinColumns = @JoinColumn(name = "staff_id"))
    @Column(name = "specialty", length = 300)
    @Builder.Default
    private List<String> specialties = new ArrayList<>();
}
