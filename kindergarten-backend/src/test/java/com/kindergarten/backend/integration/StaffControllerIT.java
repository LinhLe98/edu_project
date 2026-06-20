package com.kindergarten.backend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

class StaffControllerIT extends AbstractIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getStaff_returns200_with12Items() {
        ResponseEntity<String> response = restTemplate.getForEntity("/staff", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"message\":\"OK\"");
        // Verify 12 staff members by checking for several staff names
        assertThat(response.getBody()).contains("Nguyễn Thị Hương");
        assertThat(response.getBody()).contains("Đinh Thị Yến");
    }

    @Test
    void getDepartmentLeader_returnsLeader_forToGiaoVienLa() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/staff/department/to-giao-vien-la/leader", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"groupRole\":\"leader\"");
        assertThat(response.getBody()).contains("Lê Thị Thu");
    }

    @Test
    void getFeaturedStaff_returnsFeaturedMembers() {
        ResponseEntity<String> response = restTemplate.getForEntity("/staff/featured", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"featured\":true");
    }

    @Test
    void getDepartmentStaff_returnsDepartmentMembers() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/staff/department/ban-giam-hieu", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"department\":\"ban-giam-hieu\"");
    }
}
