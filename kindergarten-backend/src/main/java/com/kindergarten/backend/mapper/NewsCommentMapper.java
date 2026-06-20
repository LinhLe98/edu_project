package com.kindergarten.backend.mapper;

import com.kindergarten.backend.dto.NewsCommentDto;
import com.kindergarten.backend.entity.NewsComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NewsCommentMapper {
    NewsCommentDto toDto(NewsComment entity);
    List<NewsCommentDto> toDtoList(List<NewsComment> entities);
}
