package com.champ.oms.user;

import java.util.Optional;

import com.champ.oms.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

  Optional<User> findByEmail(String email);

}
