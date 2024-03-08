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
public class SignUpRequest {
    @NotBlank
    @NotNull
    String fullName;

    @NotBlank
    @NotNull
    String username;

    @NotBlank
    @NotNull
    @Email
    String email;

    @NotBlank
    @NotNull
    String password;
}
