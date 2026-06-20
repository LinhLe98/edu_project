package com.kindergarten.backend.service.impl;

import com.kindergarten.backend.dto.ContactInfoDto;
import com.kindergarten.backend.dto.SupportRequestCreateDto;
import com.kindergarten.backend.dto.SupportRequestDto;
import com.kindergarten.backend.entity.SupportRequest;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.ContactMapper;
import com.kindergarten.backend.repository.ContactInfoRepository;
import com.kindergarten.backend.repository.SupportRequestRepository;
import com.kindergarten.backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactInfoRepository contactInfoRepository;
    private final SupportRequestRepository supportRequestRepository;
    private final ContactMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public ContactInfoDto findContactInfo() {
        return mapper.toContactInfoDto(
                contactInfoRepository.findById("contact-1")
                        .orElseThrow(() -> new ResourceNotFoundException("ContactInfo", "contact-1"))
        );
    }

    @Override
    @Transactional
    public SupportRequestDto createSupportRequest(SupportRequestCreateDto dto) {
        SupportRequest request = SupportRequest.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .build();
        return mapper.toSupportRequestDto(supportRequestRepository.save(request));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SupportRequestDto> findAllSupportRequests(Pageable pageable) {
        return supportRequestRepository.findAll(pageable).map(mapper::toSupportRequestDto);
    }
}
