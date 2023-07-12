package com.champ.oms.service;

import com.champ.oms.document.User;
import com.champ.oms.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public Iterable<User> listAll() {
        return this.userRepository.findAll();
    }

    @Transactional
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public void updateUser(User user) {
        userRepository.save(user);
    }
}
