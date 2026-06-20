package com.kindergarten.backend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

class NewsControllerIT extends AbstractIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getNews_returns200_with8Items() {
        ResponseEntity<String> response = restTemplate.getForEntity("/news", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"message\":\"OK\"");
        // The seed data has 8 news articles with page size 6, but first page returns 6
        // We verify the response body contains news data
        assertThat(response.getBody()).contains("\"totalElements\":8");
    }

    @Test
    void getFeaturedNews_returnsOnlyFeaturedArticles() {
        ResponseEntity<String> response = restTemplate.getForEntity("/news/featured", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"featured\":true");
        // news-1, news-2, news-3 are featured
        assertThat(response.getBody()).contains("khai-giang-nam-hoc-moi-2025-2026");
    }

    @Test
    void getNewsBySlug_returns404_forUnknownSlug() {
        ResponseEntity<String> response = restTemplate.getForEntity("/news/unknown-nonexistent-slug", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).contains("\"error\"");
    }

    @Test
    void getNewsBySlug_returns200_forExistingSlug() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/news/khai-giang-nam-hoc-moi-2025-2026", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("khai-giang-nam-hoc-moi-2025-2026");
    }
}
