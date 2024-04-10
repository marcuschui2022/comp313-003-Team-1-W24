package com.foodista.dto;

import com.foodista.entities.CategoryDetail;
import com.foodista.entities.PostType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    @NotBlank
    Long post_Id;

    @NotBlank
    @NotNull
    Long blog_id;

    @NotBlank
    @NotNull
    String author;

    @NotBlank
    @NotNull
    String publishDate;

    @NotBlank
    @NotNull
    String post_content;

    @NotBlank
    @NotNull
    String post_description;

    @NotBlank
    @NotNull
    String post_profile_picture_url;

    @NotBlank
    @NotNull
    CategoryDetail category;

    @NotBlank
    @NotNull
    PostType postType;
}
