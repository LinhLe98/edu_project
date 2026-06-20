package com.kindergarten.backend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

class ContactControllerIT extends AbstractIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void createSupportRequest_returns201_withValidBody() {
        String requestBody = """
                {
                    "name": "Nguyễn Văn Test",
                    "phone": "0909 000 000",
                    "email": "test@example.com",
                    "subject": "Test hỗ trợ",
                    "message": "Tôi cần hỗ trợ thông tin về nhà trường."
                }
                """;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "/contact/support-requests", request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).contains("\"message\":\"Created\"");
        assertThat(response.getBody()).contains("PENDING");
    }

    @Test
    void createSupportRequest_returns400_withMissingName() {
        String requestBody = """
                {
                    "phone": "0909 000 000",
                    "message": "Tôi cần hỗ trợ thông tin về nhà trường."
                }
                """;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "/contact/support-requests", request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).contains("\"error\"");
    }

    @Test
    void createSupportRequest_returns400_withMissingMessage() {
        String requestBody = """
                {
                    "name": "Nguyễn Văn Test"
                }
                """;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "/contact/support-requests", request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void getContactInfo_returns200() {
        ResponseEntity<String> response = restTemplate.getForEntity("/contact", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Trường Mầm Non Ánh Dương");
    }
}
