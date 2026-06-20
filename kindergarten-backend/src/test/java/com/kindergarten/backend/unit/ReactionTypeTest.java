package com.kindergarten.backend.unit;

import com.kindergarten.backend.enums.ReactionType;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class ReactionTypeTest {
    @Test
    void slugValues_matchSpec() {
        assertThat(ReactionType.HEART.getSlug()).isEqualTo("heart");
        assertThat(ReactionType.THUMBS_UP.getSlug()).isEqualTo("thumbs-up");
        assertThat(ReactionType.SMILE.getSlug()).isEqualTo("smile");
        assertThat(ReactionType.PARTY.getSlug()).isEqualTo("party");
    }

    @Test
    void fromSlug_returnsCorrectEnum() {
        assertThat(ReactionType.fromSlug("thumbs-up")).isEqualTo(ReactionType.THUMBS_UP);
    }

    @Test
    void fromSlug_throwsForUnknown() {
        org.junit.jupiter.api.Assertions.assertThrows(
            IllegalArgumentException.class, () -> ReactionType.fromSlug("unknown"));
    }
}
