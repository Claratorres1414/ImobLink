package com.PIEC.ImobLink.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.PIEC.ImobLink.Entitys.User;
import com.PIEC.ImobLink.Services.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/profile")
    public ResponseEntity<String> getProfile(Authentication authentication) {
        return ResponseEntity.ok("Usuário autenticado: " + authentication.getName());
    }
}
