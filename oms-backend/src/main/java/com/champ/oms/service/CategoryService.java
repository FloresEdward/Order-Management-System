package com.champ.oms.service;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.document.Category;
import com.champ.oms.repo.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    public void saveCategory (CategoryBean categoryBean) {
        var category = Category.builder()
                .id(new ObjectId().toString())
                .name(categoryBean.getName())
                .build();
        categoryRepository.save(category);
    }
}
