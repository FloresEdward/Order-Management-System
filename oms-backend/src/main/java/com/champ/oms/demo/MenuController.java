package com.champ.oms.demo;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.bean.MenuBean;
import com.champ.oms.document.Menu;
import com.champ.oms.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/management/menu")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MenuController {

    @Autowired
    private final MenuService service;

    @GetMapping("/")
    public List<Menu> getMenuItems() {
        return service.getAllActiveMenuItems();
    }

    @PostMapping("/")
    public void addMenuItem(
            @RequestBody MenuBean menu
    ) {
        service.saveProduct(menu);
    }
}
