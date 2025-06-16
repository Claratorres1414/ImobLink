package com.PIEC.ImobLink.Controllers;

import com.PIEC.ImobLink.Services.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final CustomUserDetailsService customUserDetailsService;

    @GetMapping("/teste")
    public ResponseEntity<String> userAccess() {
        return ResponseEntity.ok("Acesso permitido para USER ou ADMIN");
    }

    @GetMapping("/admin/teste")
    public ResponseEntity<String> adminAccess() {
        return ResponseEntity.ok("Acesso permitido apenas para ADMIN");
    }

    @GetMapping("/account")
    public ResponseEntity<UserDetails> loadAccountInfo(Authentication authentication) {
        String email = authentication.getName();
        UserDetails response = customUserDetailsService.loadUserByUsername(email);

        return ResponseEntity.ok(response);
    }
}
