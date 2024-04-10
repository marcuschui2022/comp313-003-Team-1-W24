package com.foodista.dto;

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
public class PostRequest {
//    @NotBlank
//    Long post_Id;

    @NotBlank
    Long blog_id;

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
    Long category_id;

    @NotBlank
    @NotNull
    Long post_type_id;
}
