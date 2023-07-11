package com.champ.oms.service;

import com.champ.oms.bean.MenuBean;
import com.champ.oms.document.Category;
import com.champ.oms.document.Menu;
import com.champ.oms.repo.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    @Autowired
    private final MenuRepository menuRepository;

    public List<Menu> getAllMenuItems() {
        return menuRepository.findAll();
    }

    public List<Menu> getAllActiveMenuItems() {
        return menuRepository.findByStatus("active");
    }

    public void saveProduct (MenuBean menuBean) {
        Menu menu = Menu.builder()
                .id(new ObjectId().toString())
                .name(menuBean.getName())
                .price(menuBean.getPrice())
                .description(menuBean.getDescription())
                .stock(menuBean.getStock())
                .category(menuBean.getCategory())
                .status("active")
                .build();

        menuRepository.save(menu);
    }

    public void updateMenuItemStatus(String menuId){
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new MenuNotFoundException("Menu not found with ID: " + menuId));

        menu.setStatus("inactive");
        menuRepository.save(menu);
    }

    public void editMenuItem(MenuBean menuBean) {
        System.out.println(menuBean);
        String menuId = menuBean.getId();
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new MenuNotFoundException("Menu not found with ID: " + menuId));
        System.out.println(menu);
        menu.setName(menuBean.getName());
        menu.setPrice(menuBean.getPrice());
        menu.setDescription(menuBean.getDescription());
        menu.setStock(menuBean.getStock());
        menu.setCategory(menuBean.getCategory());

        menuRepository.save(menu);
    }
}

class MenuNotFoundException extends RuntimeException {

    public MenuNotFoundException(String message) {
        super(message);
    }
}
