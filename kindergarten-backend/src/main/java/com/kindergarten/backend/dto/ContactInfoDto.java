package com.kindergarten.backend.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ContactInfoDto {
    String id;
    String schoolName;
    String address;
    String district;
    String city;
    String email;
    String googleMapsEmbedUrl;
    List<String> phones;
    List<WorkingHoursDto> workingHours;
    List<SocialLinkDto> socialLinks;
}
