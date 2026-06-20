package com.kindergarten.backend.entity;

import com.kindergarten.backend.enums.ReactionType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class NewsReactionId implements Serializable {

    @Column(name = "article_id", length = 50)
    private String articleId;

    @Enumerated(EnumType.STRING)
    @Column(name = "reaction", length = 20)
    private ReactionType reaction;
}
