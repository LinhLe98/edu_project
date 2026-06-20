package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AlbumCategory {
    HOAT_DONG_HOC("hoat-dong-hoc"),
    VUI_CHOI("vui-choi"),
    LE_HOI("le-hoi"),
    CO_SO_VAT_CHAT("co-so-vat-chat"),
    THAM_QUAN("tham-quan");

    private final String slug;

    AlbumCategory(String slug) {
        this.slug = slug;
    }

    @JsonValue
    public String getSlug() {
        return slug;
    }

    public static AlbumCategory fromSlug(String slug) {
        for (AlbumCategory ac : values()) {
            if (ac.slug.equalsIgnoreCase(slug)) {
                return ac;
            }
        }
        throw new IllegalArgumentException("Unknown AlbumCategory slug: " + slug);
    }
}
