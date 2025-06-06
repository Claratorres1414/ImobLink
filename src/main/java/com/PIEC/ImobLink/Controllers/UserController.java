package com.PIEC.ImobLink.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    @GetMapping("/teste")
    public ResponseEntity<String> userAccess() {
        return ResponseEntity.ok("Acesso permitido para USER ou ADMIN");
    }

    @GetMapping("/admin/teste")
    public ResponseEntity<String> adminAccess() {
        return ResponseEntity.ok("Acesso permitido apenas para ADMIN");
    }
}
