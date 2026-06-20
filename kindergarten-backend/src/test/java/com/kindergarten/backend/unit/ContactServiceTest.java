package com.kindergarten.backend.unit;

import com.kindergarten.backend.common.TestDataFactory;
import com.kindergarten.backend.dto.ContactInfoDto;
import com.kindergarten.backend.dto.SupportRequestCreateDto;
import com.kindergarten.backend.dto.SupportRequestDto;
import com.kindergarten.backend.entity.ContactInfo;
import com.kindergarten.backend.entity.SupportRequest;
import com.kindergarten.backend.enums.SupportRequestStatus;
import com.kindergarten.backend.exception.ResourceNotFoundException;
import com.kindergarten.backend.mapper.ContactMapper;
import com.kindergarten.backend.repository.ContactInfoRepository;
import com.kindergarten.backend.repository.SupportRequestRepository;
import com.kindergarten.backend.service.impl.ContactServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactInfoRepository contactInfoRepository;

    @Mock
    private SupportRequestRepository supportRequestRepository;

    @Mock
    private ContactMapper mapper;

    @InjectMocks
    private ContactServiceImpl service;

    @Test
    void findContactInfo_returnsContactInfo_whenExists() {
        ContactInfo contact = TestDataFactory.contactInfo();
        ContactInfoDto dto = ContactInfoDto.builder()
                .id("contact-1")
                .schoolName("Trường Mầm Non Ánh Dương")
                .phones(List.of("028 3855 1234"))
                .build();

        when(contactInfoRepository.findById("contact-1")).thenReturn(Optional.of(contact));
        when(mapper.toContactInfoDto(contact)).thenReturn(dto);

        ContactInfoDto result = service.findContactInfo();

        assertThat(result.getSchoolName()).isEqualTo("Trường Mầm Non Ánh Dương");
    }

    @Test
    void findContactInfo_throwsNotFound_whenMissing() {
        when(contactInfoRepository.findById("contact-1")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findContactInfo())
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void createSupportRequest_savesAndReturnsSupportRequest() {
        SupportRequestCreateDto createDto = SupportRequestCreateDto.builder()
                .name("Nguyễn Văn Test")
                .phone("0909 000 000")
                .email("test@example.com")
                .subject("Test subject")
                .message("Test message content")
                .build();

        SupportRequest saved = TestDataFactory.supportRequest();
        SupportRequestDto dto = SupportRequestDto.builder()
                .id(1L)
                .name("Nguyễn Văn Test")
                .message("Test message content")
                .status(SupportRequestStatus.PENDING)
                .build();

        when(supportRequestRepository.save(any(SupportRequest.class))).thenReturn(saved);
        when(mapper.toSupportRequestDto(saved)).thenReturn(dto);

        SupportRequestDto result = service.createSupportRequest(createDto);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getStatus()).isEqualTo(SupportRequestStatus.PENDING);
    }
}
