package com.champ.oms.demo;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.document.Category;
import com.champ.oms.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/management/category")
@PreAuthorize("hasAnyRole('CATEGORY', 'ADMIN', 'TELLER', 'MENU', 'ORDER')")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private final CategoryService service;

    @GetMapping("/")
    @PreAuthorize("hasAuthority('category:read')")
    public List<Category> getCategories() {
        return service.getAllActiveCategories();
    }

    @GetMapping("/paginated")
    @PreAuthorize("hasAuthority('category:read')")
    public Page<Category> getCategoryPaginated(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "updatedDate");
        PageRequest pageable = PageRequest.of(page, size, sort);
        return service.findAllByStatus(pageable);
    }

    @PostMapping("/")
    @PreAuthorize("hasAuthority('category:create')")
    public void addCategory(
            @RequestBody CategoryBean category
    ) {
        service.saveCategory(category);
    }

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('category:delete')")
    public ResponseEntity<?> deleteCategory(@PathVariable String id) {
        try {
            service.updateCategoryStatus(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/")
    @PreAuthorize("hasAuthority('category:update')")
    public ResponseEntity<?> updateCategoryName(@RequestBody CategoryBean category) {
        try {
            service.editCategory(category);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
