package com.kindergarten.backend.util;

import com.kindergarten.backend.enums.ReactionType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ReactionTypeConverter implements Converter<String, ReactionType> {

    @Override
    public ReactionType convert(String source) {
        return ReactionType.fromSlug(source);
    }
}
