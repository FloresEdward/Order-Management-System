package com.champ.oms.service;

import com.champ.oms.document.User;
import com.champ.oms.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public Iterable<User> listAll() {
        return this.userRepository.findAll();
    }

    public void deleteUser(String user) {
        // String user is fullname
        User _user = userRepository.findByFirstname(user);
        userRepository.deleteById(user);
    }
}
