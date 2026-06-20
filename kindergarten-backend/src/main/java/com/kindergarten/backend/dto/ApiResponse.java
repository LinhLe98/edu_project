package com.kindergarten.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private T data;
    private String message;
    private OffsetDateTime timestamp;
    private String error;
    private Object details;

    public static <T> ApiResponse<T> ok(T data) {
        return ApiResponse.<T>builder()
                .data(data)
                .message("OK")
                .timestamp(OffsetDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> created(T data) {
        return ApiResponse.<T>builder()
                .data(data)
                .message("Created")
                .timestamp(OffsetDateTime.now())
                .build();
    }

    public static ApiResponse<Void> error(String errorMessage, Object details) {
        return ApiResponse.<Void>builder()
                .error(errorMessage)
                .details(details)
                .timestamp(OffsetDateTime.now())
                .build();
    }
}
