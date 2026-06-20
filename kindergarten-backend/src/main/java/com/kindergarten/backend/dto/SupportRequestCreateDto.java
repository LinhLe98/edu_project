package com.kindergarten.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
public class SupportRequestCreateDto {

    @NotBlank
    @Size(max = 100)
    String name;

    @Pattern(regexp = "[0-9\\s+\\-()]{0,20}")
    String phone;

    @Email
    String email;

    @Size(max = 200)
    String subject;

    @NotBlank
    @Size(max = 2000)
    String message;
}
