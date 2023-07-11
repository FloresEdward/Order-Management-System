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
}
