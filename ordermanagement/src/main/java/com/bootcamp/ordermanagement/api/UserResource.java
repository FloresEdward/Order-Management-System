package com.bootcamp.ordermanagement.user.api;

import com.bootcamp.ordermanagement.user.model.User;
import com.bootcamp.ordermanagement.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class UserResource {

    private final UserService userService;

    @Autowired
    public UserResource(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/users")
    public ResponseEntity<User>getUserById(){
        return ResponseEntity.ok().body(userService.getUserById(1L));
    }
}
