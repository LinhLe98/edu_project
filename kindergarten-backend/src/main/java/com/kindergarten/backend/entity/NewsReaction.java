package com.kindergarten.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "news_reactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsReaction {

    @EmbeddedId
    private NewsReactionId id;

    @Column(name = "count", nullable = false)
    @Builder.Default
    private long count = 0L;
}
