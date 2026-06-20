package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AgeGroup {
    THREE_TUOI("3-tuoi"),
    FOUR_TUOI("4-tuoi"),
    FIVE_TUOI("5-tuoi"),
    ALL("all");

    private final String value;

    AgeGroup(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static AgeGroup fromValue(String value) {
        for (AgeGroup ag : values()) {
            if (ag.value.equalsIgnoreCase(value)) {
                return ag;
            }
        }
        throw new IllegalArgumentException("Unknown AgeGroup value: " + value);
    }
}
