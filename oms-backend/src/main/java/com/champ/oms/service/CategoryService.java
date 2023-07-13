package com.champ.oms.service;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.bean.MenuBean;
import com.champ.oms.document.Category;
import com.champ.oms.document.Menu;
import com.champ.oms.repo.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    @Autowired
    private final MenuService menuService;

    public void saveCategory (CategoryBean categoryBean) {
        Category category = Category.builder()
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

    public void editCategory(CategoryBean categoryBean) {
        String categoryId = categoryBean.getId();
        System.out.println(categoryBean.getName());
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with ID: " + categoryId));

        category.setName(categoryBean.getName());

        categoryRepository.save(category);

        List<Menu> menuItems = menuService.findActiveMenuItemsByCategoryId(categoryId);

        for(Menu item : menuItems){
            menuService.setMenuCategoriesWhenCategoryIsUpdated(category, item.getId());
        }
    }

    public Page<Category> findAllByStatus(Pageable pageable) {
        return categoryRepository.findAllByStatus("active", pageable);
    }

}

class CategoryNotFoundException extends RuntimeException {

    public CategoryNotFoundException(String message) {
        super(message);
    }
}

