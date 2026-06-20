package com.kindergarten.backend.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum GroupRole {
    LEADER("leader"),
    VICE_LEADER("vice-leader"),
    MEMBER("member");

    private final String value;

    GroupRole(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static GroupRole fromValue(String value) {
        for (GroupRole gr : values()) {
            if (gr.value.equalsIgnoreCase(value)) {
                return gr;
            }
        }
        throw new IllegalArgumentException("Unknown GroupRole value: " + value);
    }
}
