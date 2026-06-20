package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ReactionType {
    HEART("heart"),
    THUMBS_UP("thumbs-up"),
    SMILE("smile"),
    PARTY("party");

    private final String slug;

    ReactionType(String slug) {
        this.slug = slug;
    }

    @JsonValue
    public String getSlug() {
        return slug;
    }

    public static ReactionType fromSlug(String slug) {
        for (ReactionType rt : values()) {
            if (rt.slug.equalsIgnoreCase(slug)) {
                return rt;
            }
        }
        throw new IllegalArgumentException("Unknown ReactionType slug: " + slug);
    }
}
