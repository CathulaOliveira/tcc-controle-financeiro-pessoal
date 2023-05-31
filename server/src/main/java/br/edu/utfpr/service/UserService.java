package br.edu.utfpr.service;

import br.edu.utfpr.error.DuplicateUsernameException;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService (@Autowired UserRepository userRepository) {
        this.userRepository = userRepository;
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public User save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        this.validate(user);
        return userRepository.save(user);
    }

    public User update(User user) {
        if (user.getPassword() != null) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        } else {
            Optional<User> userDb = this.userRepository.findById(user.getId());
            userDb.ifPresent(value -> user.setPassword(value.getPassword()));
        }
        this.validate(user);
        return userRepository.save(user);
    }

    private void validate(User user) {
        User userDb = this.userRepository.findByUsername(user.getUsername());
        if (userDb != null && userDb.getId() != user.getId()) {
            throw new DuplicateUsernameException("Nome de acesso já cadastrado.");
        }
    }

    public User getUserLogged() {
        String userName = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(userName);
    }

    public void deleteAll() {
        userRepository.deleteAll();
    }
}
