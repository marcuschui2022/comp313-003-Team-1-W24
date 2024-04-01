package com.foodista.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.foodista.entities.CategoryDetail;
import com.foodista.entities.PostType;

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

//    @NotBlank
//    @NotNull
//    String author;

    @NotBlank
    @NotNull
    String publishDate;

    @NotBlank
    @NotNull
    String post_content;

    @NotBlank
    @NotNull
    CategoryDetail category;

    @NotBlank
    @NotNull
    PostType postType;
}
