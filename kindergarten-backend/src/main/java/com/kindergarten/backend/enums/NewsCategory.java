package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum NewsCategory {
    THONG_BAO("thong-bao"),
    SU_KIEN("su-kien"),
    TIN_TUC("tin-tuc"),
    HOAT_DONG("hoat-dong");

    private final String slug;

    NewsCategory(String slug) {
        this.slug = slug;
    }

    @JsonValue
    public String getSlug() {
        return slug;
    }

    public static NewsCategory fromSlug(String slug) {
        for (NewsCategory nc : values()) {
            if (nc.slug.equalsIgnoreCase(slug)) {
                return nc;
            }
        }
        throw new IllegalArgumentException("Unknown NewsCategory slug: " + slug);
    }
}
