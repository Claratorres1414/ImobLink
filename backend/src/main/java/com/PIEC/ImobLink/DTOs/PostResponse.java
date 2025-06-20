package com.PIEC.ImobLink.DTOs;

import com.PIEC.ImobLink.Entitys.Post;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostResponse {
    private String imageUrl;
    private String description;
    private LocalDateTime createdAt;
    private String createdBy;

    public PostResponse(Post post) {
        this.imageUrl = post.getImageUrl();
        this.description = post.getDescription();
        this.createdAt = post.getCreatedAt();
        this.createdBy = post.getUser().getName();
    }
}
