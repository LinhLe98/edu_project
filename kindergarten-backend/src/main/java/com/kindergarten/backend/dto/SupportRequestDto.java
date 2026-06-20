package com.kindergarten.backend.dto;

import com.kindergarten.backend.enums.SupportRequestStatus;
import lombok.Builder;
import lombok.Value;

import java.time.OffsetDateTime;

@Value
@Builder
public class SupportRequestDto {
    Long id;
    String name;
    String phone;
    String email;
    String subject;
    String message;
    SupportRequestStatus status;
    OffsetDateTime createdAt;
}
