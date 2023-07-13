package com.champ.oms.repo;

import java.util.Optional;

import com.champ.oms.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

  Optional<User> findById(String id);
  Optional<User> findByEmail(String email);

  User findByFirstname(String firstname);

}