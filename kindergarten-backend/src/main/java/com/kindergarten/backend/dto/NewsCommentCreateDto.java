package com.kindergarten.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NewsCommentCreateDto {

    @NotBlank(message = "Author name is required")
    @Size(max = 100, message = "Author name must be 100 characters or less")
    private String authorName;

    @NotBlank(message = "Message is required")
    private String message;
}
