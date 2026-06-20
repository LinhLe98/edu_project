package com.kindergarten.backend.util;

import com.kindergarten.backend.enums.MaterialCategory;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MaterialCategoryConverter implements Converter<String, MaterialCategory> {
    @Override
    public MaterialCategory convert(String source) {
        return MaterialCategory.fromSlug(source);
    }
}
