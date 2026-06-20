package com.kindergarten.backend.util;

import com.kindergarten.backend.enums.AgeGroup;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class AgeGroupConverter implements Converter<String, AgeGroup> {

    @Override
    public AgeGroup convert(String source) {
        return AgeGroup.fromValue(source);
    }
}
