package com.foodista.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
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
public class BlogResponse {
    @NotBlank
    @NotNull
    String blog_id;

    @NotBlank
    @NotNull
    String title;

    @NotBlank
    String blog_description;

    @NotBlank
    @NotNull
    String user_id;
}
