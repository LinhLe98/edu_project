package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum CommentStatus {
    PENDING("pending"),
    APPROVED("approved");

    private final String slug;

    CommentStatus(String slug) {
        this.slug = slug;
    }

    @JsonValue
    public String getSlug() {
        return slug;
    }
}
