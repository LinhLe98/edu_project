package com.kindergarten.backend.util;

import com.kindergarten.backend.enums.NewsCategory;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class NewsCategoryConverter implements Converter<String, NewsCategory> {

    @Override
    public NewsCategory convert(String source) {
        return NewsCategory.fromSlug(source);
    }
}
