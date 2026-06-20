package com.kindergarten.backend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

class NewsCommentControllerIT extends AbstractIT {

    @Autowired
    private TestRestTemplate restTemplate;

    // The V2 seed has a news article with slug "khai-giang-nam-hoc-moi-2025-2026"

    @Test
    void getComments_returns200_withDataArray() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/news/khai-giang-nam-hoc-moi-2025-2026/comments", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"data\":");
        assertThat(response.getBody()).contains("\"message\":\"OK\"");
    }

    @Test
    void postComment_returns201_andPendingStatus() {
        String body = "{\"authorName\":\"Nguyễn Văn Test\",\"message\":\"Bài viết hay!\"}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "/news/khai-giang-nam-hoc-moi-2025-2026/comments", request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).contains("Nguyễn Văn Test");
        assertThat(response.getBody()).contains("Bài viết hay!");
    }

    @Test
    void postComment_returns400_whenAuthorNameBlank() {
        String body = "{\"authorName\":\"\",\"message\":\"Hello\"}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "/news/khai-giang-nam-hoc-moi-2025-2026/comments", request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void postComment_returns404_forUnknownSlug() {
        String body = "{\"authorName\":\"Test\",\"message\":\"Hello\"}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "/news/unknown-slug-that-does-not-exist/comments", request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void getReactions_returns200_withEmptyMap_initially() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/news/khai-giang-nam-hoc-moi-2025-2026/reactions", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"reactions\"");
    }

    @Test
    void postReaction_increments_whenNotReacted() {
        // Increment heart reaction
        ResponseEntity<String> response = restTemplate.postForEntity(
                "/news/khai-giang-nam-hoc-moi-2025-2026/reactions/heart?reacted=false",
                null, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"heart\"");
    }

    @Test
    void adminGetComments_requires_authentication() {
        ResponseEntity<String> response = restTemplate.getForEntity("/admin/comments", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void adminApproveComment_approvesAndBecomesVisible() {
        // Step 1: Post a comment
        String body = "{\"authorName\":\"Admin Test\",\"message\":\"Approve me!\"}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> postRequest = new HttpEntity<>(body, headers);
        ResponseEntity<String> postResponse = restTemplate.postForEntity(
                "/news/khai-giang-nam-hoc-moi-2025-2026/comments", postRequest, String.class);
        assertThat(postResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        // Step 2: Extract the comment ID from the response
        String responseBody = postResponse.getBody();
        // Parse id from JSON like {"data":{"id":1,...}}
        int idStart = responseBody.indexOf("\"id\":") + 5;
        int idEnd = responseBody.indexOf(",", idStart);
        long commentId = Long.parseLong(responseBody.substring(idStart, idEnd).trim());

        // Step 3: Admin approves the comment
        TestRestTemplate adminTemplate = restTemplate.withBasicAuth("admin", "admin");
        ResponseEntity<String> approveResponse = adminTemplate.exchange(
                "/admin/comments/" + commentId + "/approve",
                HttpMethod.PUT, null, String.class);
        assertThat(approveResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        // Step 4: Verify comment now appears in public GET
        ResponseEntity<String> getResponse = restTemplate.getForEntity(
                "/news/khai-giang-nam-hoc-moi-2025-2026/comments", String.class);
        assertThat(getResponse.getBody()).contains("Approve me!");
    }
}
