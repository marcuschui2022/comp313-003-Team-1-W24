package com.foodista.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    Long comment_id;
    String comment;
    Long user_id;
    String full_name;
    String create_at;
}
