package br.edu.utfpr.controller;

import br.edu.utfpr.model.User;
import br.edu.utfpr.security.AuthUserService;
import br.edu.utfpr.security.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthUserService authUserService;

    @GetMapping("user-info")
    public UserDTO getUserInfo(Principal principal) {
        return new UserDTO( (User)
                authUserService.loadUserByUsername(principal.getName()));
    }
}
