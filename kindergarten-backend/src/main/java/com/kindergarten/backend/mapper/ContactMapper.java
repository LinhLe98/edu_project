package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.*;
import com.kindergarten.backend.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMapper {
    WorkingHoursDto toWorkingHoursDto(WorkingHours entity);
    SocialLinkDto toSocialLinkDto(SocialLink entity);
    ContactInfoDto toContactInfoDto(ContactInfo entity);

    @Mapping(source = "createdAt", target = "createdAt")
    SupportRequestDto toSupportRequestDto(SupportRequest entity);
}
