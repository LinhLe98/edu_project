package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.NewsArticleDto;
import com.kindergarten.backend.entity.NewsArticle;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NewsArticleMapper {
    NewsArticleDto toDto(NewsArticle entity);
    List<NewsArticleDto> toDtoList(List<NewsArticle> entities);
}
