package com.kindergarten.backend.config;

import com.kindergarten.backend.util.AgeGroupConverter;
import com.kindergarten.backend.util.AlbumCategoryConverter;
import com.kindergarten.backend.util.MaterialCategoryConverter;
import com.kindergarten.backend.util.NewsCategoryConverter;
import com.kindergarten.backend.util.ReactionTypeConverter;
import com.kindergarten.backend.util.StaffDepartmentConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final AgeGroupConverter ageGroupConverter;
    private final StaffDepartmentConverter staffDepartmentConverter;
    private final NewsCategoryConverter newsCategoryConverter;
    private final AlbumCategoryConverter albumCategoryConverter;
    private final MaterialCategoryConverter materialCategoryConverter;
    private final ReactionTypeConverter reactionTypeConverter;

    public WebMvcConfig(AgeGroupConverter ageGroupConverter,
                        StaffDepartmentConverter staffDepartmentConverter,
                        NewsCategoryConverter newsCategoryConverter,
                        AlbumCategoryConverter albumCategoryConverter,
                        MaterialCategoryConverter materialCategoryConverter,
                        ReactionTypeConverter reactionTypeConverter) {
        this.ageGroupConverter = ageGroupConverter;
        this.staffDepartmentConverter = staffDepartmentConverter;
        this.newsCategoryConverter = newsCategoryConverter;
        this.albumCategoryConverter = albumCategoryConverter;
        this.materialCategoryConverter = materialCategoryConverter;
        this.reactionTypeConverter = reactionTypeConverter;
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(ageGroupConverter);
        registry.addConverter(staffDepartmentConverter);
        registry.addConverter(newsCategoryConverter);
        registry.addConverter(albumCategoryConverter);
        registry.addConverter(materialCategoryConverter);
        registry.addConverter(reactionTypeConverter);
    }
}
