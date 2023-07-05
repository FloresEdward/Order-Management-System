package com.bootcamp.ordermanagement.user.service;

import com.bootcamp.ordermanagement.user.model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    void deleteUser(Long id);
}

