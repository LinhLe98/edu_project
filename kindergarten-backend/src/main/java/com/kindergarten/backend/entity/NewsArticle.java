package com.kindergarten.backend.entity;

import com.kindergarten.backend.enums.NewsCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "news_articles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsArticle extends BaseAuditEntity {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "title", length = 500, nullable = false)
    private String title;

    @Column(name = "slug", length = 300, nullable = false, unique = true)
    private String slug;

    @Column(name = "excerpt", columnDefinition = "TEXT")
    private String excerpt;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "cover_image", length = 500)
    private String coverImage;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", length = 50, nullable = false)
    private NewsCategory category;

    @Column(name = "featured", nullable = false)
    private boolean featured;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "news_tags", joinColumns = @JoinColumn(name = "article_id"))
    @Column(name = "tag", length = 100)
    @Builder.Default
    private List<String> tags = new ArrayList<>();
}
