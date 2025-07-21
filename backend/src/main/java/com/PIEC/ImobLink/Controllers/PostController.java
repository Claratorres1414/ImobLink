package com.PIEC.ImobLink.Controllers;

import com.PIEC.ImobLink.DTOs.PostRequest;
import com.PIEC.ImobLink.DTOs.PostResponse;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.PIEC.ImobLink.Entitys.Post;
import com.PIEC.ImobLink.Services.PostService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPost(@RequestParam("description") String description, @RequestParam("image")MultipartFile image, Authentication auth) throws IOException {
        System.out.println("Recebi a imagem: " + image.getOriginalFilename());
        String response = postService.createPost(image, description, auth);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-posts")
    public ResponseEntity<List<PostResponse>> getMyPosts(Authentication auth) {
        List<PostResponse> posts = postService.getPostsByUser(auth.getName());
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id,  Authentication auth) throws ServletException {
        String response = postService.deletePost(id, auth);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<UrlResource> getImage(@PathVariable Long id) throws IOException {
        Post post = postService.get(id);
        Path path = Paths.get(post.getImagePath());

        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        UrlResource file = new UrlResource(path.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(post.getImageType()))
                .body(file);
    }
}
