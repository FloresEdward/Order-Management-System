package com.champ.oms.service;

import com.champ.oms.bean.MenuBean;
import com.champ.oms.bean.OrderItemBean;
import com.champ.oms.document.Category;
import com.champ.oms.document.Menu;
import com.champ.oms.repo.MenuRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class MenuServiceTest {

    @Mock
    private MenuRepository menuRepository;

    @InjectMocks
    private MenuService menuService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllMenuItems() {
        Menu menu1 = Menu.builder()
                .id("1")
                .name("Menu 1")
                .description("Description 1")
                .category(Category.builder().id("category1").build())
                .price(10.0f)
                .stock(100)
                .status("active")
                .build();

        Menu menu2 = Menu.builder()
                .id("2")
                .name("Menu 2")
                .description("Description 2")
                .category(Category.builder().id("category2").build())
                .price(20.0f)
                .stock(200)
                .status("active")
                .build();

        List<Menu> menuList = new ArrayList<>();
        menuList.add(menu1);
        menuList.add(menu2);

        when(menuRepository.findAll()).thenReturn(menuList);

        List<Menu> result = menuService.getAllMenuItems();

        assertEquals(2, result.size());
        assertEquals("Menu 1", result.get(0).getName());
        assertEquals("Menu 2", result.get(1).getName());

        verify(menuRepository, times(1)).findAll();
    }

    @Test
    public void testGetAllActiveMenuItems() {
        Menu menu1 = Menu.builder()
                .id("1")
                .name("Menu 1")
                .description("Description 1")
                .category(Category.builder().id("category1").build())
                .price(10.0f)
                .stock(100)
                .status("active")
                .build();

        Menu menu2 = Menu.builder()
                .id("2")
                .name("Menu 2")
                .description("Description 2")
                .category(Category.builder().id("category2").build())
                .price(20.0f)
                .stock(200)
                .status("inactive")
                .build();

        List<Menu> menuList = new ArrayList<>();
        menuList.add(menu1);
        menuList.add(menu2);

        when(menuRepository.findByStatus("active")).thenReturn(menuList);

        List<Menu> result = menuService.getAllActiveMenuItems();

        assertEquals(2, result.size());
        assertEquals("Menu 1", result.get(0).getName());

        verify(menuRepository, times(1)).findByStatus("active");
    }

    @Test
    public void testFindActiveMenuItemsByCategoryId() {
        String categoryId = "category1";

        Menu menu1 = Menu.builder()
                .id("1")
                .name("Menu 1")
                .description("Description 1")
                .category(Category.builder().id("category1").build())
                .price(10.0f)
                .stock(100)
                .status("active")
                .build();

        Menu menu2 = Menu.builder()
                .id("2")
                .name("Menu 2")
                .description("Description 2")
                .category(Category.builder().id("category2").build())
                .price(20.0f)
                .stock(200)
                .status("active")
                .build();

        List<Menu> menuList = new ArrayList<>();
        menuList.add(menu1);
        menuList.add(menu2);

        when(menuRepository.findByCategory_IdAndStatus(categoryId, "active")).thenReturn(menuList);

        List<Menu> result = menuService.findActiveMenuItemsByCategoryId(categoryId);

        assertEquals(2, result.size());
        assertEquals("Menu 1", result.get(0).getName());

        verify(menuRepository, times(1)).findByCategory_IdAndStatus(categoryId, "active");
    }

    @Test
    public void testSaveProduct() {
        MenuBean menuBean = MenuBean.builder()
                .name("New Menu")
                .description("Description")
                .category(Category.builder().id("category1").build())
                .price(15.0f)
                .stock(50)
                .build();

        menuService.saveProduct(menuBean);

        verify(menuRepository, times(1)).save(any(Menu.class));
    }

    @Test
    public void testUpdateMenuItemStatus() {
        String menuId = "1";

        Menu menu = Menu.builder()
                .id(menuId)
                .name("Menu 1")
                .description("Description 1")
                .category(Category.builder().id("category1").build())
                .price(10.0f)
                .stock(100)
                .status("active")
                .build();

        when(menuRepository.findById(menuId)).thenReturn(Optional.of(menu));

        menuService.updateMenuItemStatus(menuId);

        verify(menuRepository, times(1)).findById(menuId);
        verify(menuRepository, times(1)).save(menu);
    }

    @Test
    public void testEditMenuItem() {
        String menuId = "1";

        Menu menu = Menu.builder()
                .id(menuId)
                .name("Menu 1")
                .description("Description 1")
                .category(Category.builder().id("category1").build())
                .price(10.0f)
                .stock(100)
                .status("active")
                .build();

        when(menuRepository.findById(menuId)).thenReturn(Optional.of(menu));

        MenuBean modifiedMenuBean = MenuBean.builder()
                .id(menuId)
                .name("Menu 1 - Modified")
                .description("Description 1 - Modified")
                .category(Category.builder().id("category2").build())
                .price(20.0f)
                .stock(200)
                .build();

        menuService.editMenuItem(modifiedMenuBean);

        verify(menuRepository, times(1)).findById(menuId);
        verify(menuRepository, times(1)).save(menu);

        assertEquals("Menu 1 - Modified", menu.getName());
        assertEquals("Description 1 - Modified", menu.getDescription());
        assertEquals("category2", menu.getCategory().getId());
        assertEquals(20.0f, menu.getPrice());
        assertEquals(200, menu.getStock());
    }

    @Test
    public void testSetMenuCategoriesWhenCategoryIsUpdated() {
        String menuId = "1";

        Menu menu = Menu.builder()
                .id(menuId)
                .name("Menu 1")
                .description("Description 1")
                .category(Category.builder().id("category1").build())
                .price(10.0f)
                .stock(100)
                .status("active")
                .build();

        when(menuRepository.findById(menuId)).thenReturn(Optional.of(menu));

        Category updatedCategory = Category.builder().id("category2").build();

        menuService.setMenuCategoriesWhenCategoryIsUpdated(updatedCategory, menuId);

        verify(menuRepository, times(1)).findById(menuId);
        verify(menuRepository, times(1)).save(menu);

        assertEquals("category2", menu.getCategory().getId());
    }

    @Test
    public void testUpdateOrderItemBeans() {
        List<OrderItemBean> orderItemBeans = new ArrayList<>();
        orderItemBeans.add(OrderItemBean.builder().product("Product 1").quantity(5).build());
        orderItemBeans.add(OrderItemBean.builder().product("Product 2").quantity(10).build());

        Menu menu1 = Menu.builder()
                .name("Product 1")
                .stock(100)
                .build();

        Menu menu2 = Menu.builder()
                .name("Product 2")
                .stock(200)
                .build();

        when(menuRepository.findByName("Product 1")).thenReturn(menu1);
        when(menuRepository.findByName("Product 2")).thenReturn(menu2);

        menuService.updateOrderItemBeans(orderItemBeans);

        verify(menuRepository, times(1)).findByName("Product 1");
        verify(menuRepository, times(1)).findByName("Product 2");
        verify(menuRepository, times(1)).save(menu1);
        verify(menuRepository, times(1)).save(menu2);

        assertEquals(95, menu1.getStock());
        assertEquals(190, menu2.getStock());
    }

    @Test
    public void testUpdateStock() {
        String menuName = "Product 1";
        Long quantity = 5L;

        Menu menu = Menu.builder()
                .name(menuName)
                .stock(10)
                .build();

        when(menuRepository.findByName(menuName)).thenReturn(menu);

        menuService.updateStock(menuName, quantity);

        verify(menuRepository, times(1)).findByName(menuName);
        verify(menuRepository, times(1)).save(menu);

        assertEquals(5, menu.getStock());
    }
}
