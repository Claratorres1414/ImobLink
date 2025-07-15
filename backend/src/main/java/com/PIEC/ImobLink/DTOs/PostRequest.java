package com.PIEC.ImobLink.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class PostRequest {
    private String description;
    //private MultipartFile image;
}
