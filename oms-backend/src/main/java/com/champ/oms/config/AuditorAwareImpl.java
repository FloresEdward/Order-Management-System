package com.champ.oms.config;

import com.champ.oms.document.User;
import org.springframework.data.domain.AuditorAware;
import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<User> {

    // Implement the getCurrentAuditor() method
    @Override
    public Optional<User> getCurrentAuditor() {
        // Logic to retrieve the currently authenticated user
        // You can use Spring Security or any other mechanism to obtain the user information
        // Return an instance of User representing the current user
        //return Optional.of(new User("username")); // Replace "username" with the actual username or unique identifier
        return null;
    }
}

