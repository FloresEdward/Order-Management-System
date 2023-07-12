package com.champ.oms.repo;

import com.champ.oms.document.Menu;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends MongoRepository<Menu, String> {
    List<Menu> findByStatus(String status);
}