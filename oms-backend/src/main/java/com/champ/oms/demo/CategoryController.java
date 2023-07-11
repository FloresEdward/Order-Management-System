package com.champ.oms.demo;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.document.Category;
import com.champ.oms.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/management/category")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private final CategoryService service;

    @PostMapping("/")
    public void addCategory(
            @RequestBody CategoryBean category
    ) {
        service.saveCategory(category);
    }
}
