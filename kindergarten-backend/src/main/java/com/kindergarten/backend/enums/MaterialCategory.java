package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum MaterialCategory {
    THUC_DON("thuc-don"),
    LICH_HOC("lich-hoc"),
    SACH_BAI_TAP("sach-bai-tap"),
    AM_NHAC("am-nhac"),
    HUONG_DAN("huong-dan"),
    THE_CHAT("the-chat"),
    NGHE_THUAT("nghe-thuat");

    private final String slug;

    MaterialCategory(String slug) {
        this.slug = slug;
    }

    @JsonValue
    public String getSlug() {
        return slug;
    }

    public static MaterialCategory fromSlug(String slug) {
        for (MaterialCategory mc : values()) {
            if (mc.slug.equalsIgnoreCase(slug)) {
                return mc;
            }
        }
        throw new IllegalArgumentException("Unknown MaterialCategory slug: " + slug);
    }
}
