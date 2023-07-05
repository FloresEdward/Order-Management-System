package com.bootcamp.ordermanagement.user.repository;

import com.bootcamp.ordermanagement.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can define additional custom methods for querying the User entity if needed
    User findByFirstName(String firstName);
}

