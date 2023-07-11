package com.champ.oms.service;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.document.Category;
import com.champ.oms.repo.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    public void saveCategory (CategoryBean categoryBean) {
        var category = Category.builder()
                .id(new ObjectId().toString())
                .name(categoryBean.getName())
                .status("active")
                .build();
        categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getAllActiveCategories() {
        return categoryRepository.findByStatus("active");
    }

    public void updateCategoryStatus(String categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with ID: " + categoryId));

        category.setStatus("inactive");
        categoryRepository.save(category);
    }
}

class CategoryNotFoundException extends RuntimeException {

    public CategoryNotFoundException(String message) {
        super(message);
    }
}

