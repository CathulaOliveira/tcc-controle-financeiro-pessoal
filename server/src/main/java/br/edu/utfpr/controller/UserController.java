package br.edu.utfpr.controller;

import br.edu.utfpr.model.User;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

//    @PostMapping
//    GenericResponse createUser(@Valid @RequestBody User user) {
//        userService.save(user);
//        return new GenericResponse("Registro salvo.");
//    }

    @GetMapping("user-logged")
    public User getUserLogged() {
        return this.userService.getUserLogged();
    }
}
