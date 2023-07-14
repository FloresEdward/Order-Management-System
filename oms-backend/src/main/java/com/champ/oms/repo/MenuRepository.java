package com.champ.oms.repo;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.document.Category;
import com.champ.oms.document.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuRepository extends MongoRepository<Menu, String> {
    List<Menu> findByStatus(String status);

    List<Menu> findByCategory_IdAndStatus(String categoryId, String status);
    Page<Menu> findAllByStatus(String status, Pageable pageable);

    Menu findByName(String name);
}
