package com.kindergarten.backend.util;

import com.kindergarten.backend.enums.AlbumCategory;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class AlbumCategoryConverter implements Converter<String, AlbumCategory> {
    @Override
    public AlbumCategory convert(String source) {
        return AlbumCategory.fromSlug(source);
    }
}
