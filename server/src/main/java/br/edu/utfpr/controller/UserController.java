package br.edu.utfpr.controller;

import br.edu.utfpr.error.ApiError;
import br.edu.utfpr.error.DuplicateUsernameException;
import br.edu.utfpr.model.User;
import br.edu.utfpr.service.UserService;
import br.edu.utfpr.shared.GenericResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity createUser(@Valid @RequestBody User user) {
        try {
            User savedUser = userService.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (DuplicateUsernameException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity update(@RequestBody User user) {
        try {
            User savedUser = userService.update(user);
            return ResponseEntity.ok(savedUser);
        } catch (DuplicateUsernameException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("user-logged")
    public User getUserLogged() {
        return this.userService.getUserLogged();
    }
}
