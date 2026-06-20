package com.kindergarten.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
        CorsProperties cors,
        AdminProperties admin
) {
    public record CorsProperties(String allowedOrigins) {}
    public record AdminProperties(String username, String password) {}
}
