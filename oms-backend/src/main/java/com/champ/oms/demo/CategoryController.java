package com.champ.oms.demo;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.document.Category;
import com.champ.oms.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/management/category")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private final CategoryService service;

    @GetMapping("/")
    public List<Category> getCategories(){
        return service.getAllActiveCategories();
    }

    @PostMapping("/")
    public void addCategory(
            @RequestBody CategoryBean category
    ) {
        service.saveCategory(category);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable String id) {
        try {
            service.updateCategoryStatus(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updateCategoryName(@RequestBody CategoryBean category) {
        try {
            service.editCategory(category);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
