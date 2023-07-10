package com.champ.oms.repo;

import com.champ.oms.document.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface CustomerRepository extends MongoRepository<Customer, String> {

    Optional<Customer> findById(String id);

}
