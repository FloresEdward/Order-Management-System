package com.champ.oms.repo;

import com.champ.oms.document.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    List<Category> findByStatus(String status);

    Page<Category> findAllByStatus(String status, Pageable pageable);
}
