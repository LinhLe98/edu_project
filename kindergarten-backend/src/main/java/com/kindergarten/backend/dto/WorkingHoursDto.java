package com.kindergarten.backend.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class WorkingHoursDto {
    String label;
    String hours;
}
