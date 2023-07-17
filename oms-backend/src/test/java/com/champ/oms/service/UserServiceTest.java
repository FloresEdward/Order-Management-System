package com.champ.oms.service;

import com.champ.oms.document.Role;
import com.champ.oms.document.User;
import com.champ.oms.repo.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    void testListAll() {
        // Mock the userRepository.findAll() method
        List<User> users = new ArrayList<>();
        User user1 = new User();
        user1.setId("1");
        user1.setFirstname("John");
        user1.setLastname("Doe");
        user1.setEmail("john@example.com");
        user1.setPassword("password");

        User user2 = new User();
        user2.setId("2");
        user2.setFirstname("Jane");
        user2.setLastname("Smith");
        user2.setEmail("jane@example.com");
        user2.setPassword("password");

        users.add(user1);
        users.add(user2);

        when(userRepository.findAll()).thenReturn(users);

        // Call the method being tested
        Iterable<User> result = userService.listAll();

        // Verify the result
        assertEquals(users, result);
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testDeleteUser() {
        User user = new User();
        user.setId("1");
        userService.updateUser(user);
        userService.deleteUser("1");

        verify(userRepository, times(1)).deleteById("1");
    }




    @Test
    void testUpdateUser() {
        // Create a user object to update
        User user = new User();
        user.setStatus("inactive");
        user.setRole(Role.RIDER);

        userService.updateUser(user);

        user.setRole(Role.CATEGORY);
        user.setStatus("active");

        userService.updateUser(user);

        // Verify that userRepository.save() was called once with the correct argument
        verify(userRepository, times(2)).save(user);
    }
}