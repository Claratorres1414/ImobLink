package com.PIEC.ImobLink.Controllers;

import com.PIEC.ImobLink.DTOs.PostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.PIEC.ImobLink.Entitys.Post;
import com.PIEC.ImobLink.Services.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest, Authentication auth) {
        Post post = postService.createPost(postRequest.getImageUrl(), postRequest.getDescription(), auth);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/my-posts")
    public ResponseEntity<List<Post>> getMyPosts(Authentication auth) {
        List<Post> posts = postService.getPostsByUser(auth.getName());
        return ResponseEntity.ok(posts);
    }
}
