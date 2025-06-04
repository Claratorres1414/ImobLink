package com.PIEC.ImobLink.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.PIEC.ImobLink.Repositorys.UserRepository;
import com.PIEC.ImobLink.Entitys.User;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        return userRepository.save(user);
    }
}
