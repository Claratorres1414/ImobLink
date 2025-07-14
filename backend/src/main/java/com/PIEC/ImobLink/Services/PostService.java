package com.PIEC.ImobLink.Services;

import com.PIEC.ImobLink.DTOs.PostResponse;
import com.PIEC.ImobLink.Entitys.User;
import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.PIEC.ImobLink.Entitys.Post;
import com.PIEC.ImobLink.Repositorys.PostRepository;
import com.PIEC.ImobLink.Repositorys.UserRepository;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Value("${upload.dir}")
    private String uploadDir;

    @Transactional
    public String createPost(MultipartFile image, String description, Authentication auth) throws IOException, java.io.IOException {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();

        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);
        Path filePath = uploadPath.resolve(filename);

        image.transferTo(filePath);

        Post post = new Post();
        post.setImagePath(filePath.toString());
        post.setImagePath(image.getContentType());
        post.setDescription(description);
        post.setUser(user);

        postRepository.save(post);

        return "post created!";
    }

    public List<PostResponse> getPostsByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found " + email));

        return user.getPosts().stream()
                .map(PostResponse::new)
                .toList();
    }

    public Post get(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post não encontrado: " + id));
    }
}
