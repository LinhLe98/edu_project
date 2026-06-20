package com.kindergarten.backend.service;

import com.kindergarten.backend.dto.ContactInfoDto;
import com.kindergarten.backend.dto.SupportRequestCreateDto;
import com.kindergarten.backend.dto.SupportRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContactService {
    ContactInfoDto findContactInfo();
    SupportRequestDto createSupportRequest(SupportRequestCreateDto dto);
    Page<SupportRequestDto> findAllSupportRequests(Pageable pageable);
}
