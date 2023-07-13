package com.champ.oms.demo;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.bean.MenuBean;
import com.champ.oms.document.Menu;
import com.champ.oms.service.MenuService;
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
@RequestMapping("/api/v1/management/menu")
@PreAuthorize("hasAnyRole('CATEGORY', 'ADMIN', 'TELLER', 'MENU', 'ORDER')")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MenuController {

    @Autowired
    private final MenuService service;

    @GetMapping("/")
    @PreAuthorize("hasAuthority('menu:read')")
    public List<Menu> getMenuItems() {
        return service.getAllActiveMenuItems();
    }

    @GetMapping("/paginated")
    @PreAuthorize("hasAuthority('menu:read')")
    public Page<Menu> getMenuItemsPaginated(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "updatedDate");
        PageRequest pageable = PageRequest.of(page, size, sort);
        return service.findAllByStatus(pageable);
    }

    @GetMapping("/category/{categoryId}")
    @PreAuthorize("hasAuthority('menu:read')")
    public List<Menu> getMenuItemsByCategory(@PathVariable String categoryId) {
        return service.findActiveMenuItemsByCategoryId(categoryId);
    }

    @PostMapping("/")
    @PreAuthorize("hasAuthority('menu:create')")
    public void addMenuItem(
            @RequestBody MenuBean menu
    ) {
        service.saveProduct(menu);
    }

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('menu:delete')")
    public ResponseEntity<?> deleteMenu(@PathVariable String id) {
        try {
            service.updateMenuItemStatus(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/")
    @PreAuthorize("hasAuthority('menu:update')")
    public ResponseEntity<?> updateMenuItem(@RequestBody MenuBean menu) {
        try {
            service.editMenuItem(menu);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
