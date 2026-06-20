package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum StaffDepartment {
    BAN_GIAM_HIEU("ban-giam-hieu"),
    TO_GIAO_VIEN_LA("to-giao-vien-la"),
    TO_GIAO_VIEN_CHOI("to-giao-vien-choi"),
    TO_GIAO_VIEN_MAM("to-giao-vien-mam"),
    TO_NHAN_VIEN("to-nhan-vien");

    private final String slug;

    StaffDepartment(String slug) {
        this.slug = slug;
    }

    @JsonValue
    public String getSlug() {
        return slug;
    }

    public static StaffDepartment fromSlug(String slug) {
        for (StaffDepartment dept : values()) {
            if (dept.slug.equalsIgnoreCase(slug)) {
                return dept;
            }
        }
        throw new IllegalArgumentException("Unknown StaffDepartment slug: " + slug);
    }
}
