package com.champ.oms.service;

import com.champ.oms.bean.CategoryBean;
import com.champ.oms.document.Category;
import com.champ.oms.repo.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private MenuService menuService;

    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveCategory() {
        CategoryBean categoryBean = new CategoryBean();
        categoryBean.setName("Test Category");

        CategoryRepository categoryRepository = Mockito.mock(CategoryRepository.class);
        MenuService menuService = Mockito.mock(MenuService.class);

        CategoryService categoryService = new CategoryService(categoryRepository, menuService);

        categoryService.saveCategory(categoryBean);

        ArgumentCaptor<Category> categoryCaptor = ArgumentCaptor.forClass(Category.class);
        Mockito.verify(categoryRepository).save(categoryCaptor.capture());

        Category savedCategory = categoryCaptor.getValue();
        assertEquals("Test Category", savedCategory.getName());
        assertEquals("active", savedCategory.getStatus());
    }

    @Test
    public void testGetAllCategories() {

        CategoryRepository categoryRepository = Mockito.mock(CategoryRepository.class);
        MenuService menuService = Mockito.mock(MenuService.class);

        List<Category> mockCategories = new ArrayList<>();
        mockCategories.add(Category.builder().id("1").name("Category 1").status("active").build());
        mockCategories.add(Category.builder().id("2").name("Category 2").status("active").build());

        Mockito.when(categoryRepository.findAll()).thenReturn(mockCategories);

        CategoryService categoryService = new CategoryService(categoryRepository, menuService);

        List<Category> result = categoryService.getAllCategories();

        assertEquals(mockCategories, result);
    }

    @Test
    public void testGetAllActiveCategories() {
        CategoryRepository categoryRepository = Mockito.mock(CategoryRepository.class);
        MenuService menuService = Mockito.mock(MenuService.class);

        List<Category> mockCategories = new ArrayList<>();
        mockCategories.add(Category.builder().id("1").name("Category 1").status("active").build());
        mockCategories.add(Category.builder().id("2").name("Category 2").status("active").build());

        Mockito.when(categoryRepository.findByStatus("active")).thenReturn(mockCategories);

        CategoryService categoryService = new CategoryService(categoryRepository, menuService);

        List<Category> result = categoryService.getAllActiveCategories();

        assertEquals(mockCategories, result);
    }

    @Test
    public void testUpdateCategoryStatus() {
        Category category = Category.builder().id("1").name("Category 1").status("active").build();

        CategoryRepository categoryRepository = Mockito.mock(CategoryRepository.class);
        MenuService menuService = Mockito.mock(MenuService.class);

        Mockito.when(categoryRepository.findById("1")).thenReturn(Optional.of(category));

        CategoryService categoryService = new CategoryService(categoryRepository, menuService);

        categoryService.updateCategoryStatus("1");

        ArgumentCaptor<Category> categoryCaptor = ArgumentCaptor.forClass(Category.class);
        Mockito.verify(categoryRepository).save(categoryCaptor.capture());

        Category updatedCategory = categoryCaptor.getValue();
        assertEquals("inactive", updatedCategory.getStatus());
    }

    @Test
    public void testEditCategory() {
        CategoryBean categoryBean = new CategoryBean();
        categoryBean.setId("1");
        categoryBean.setName("Updated Category");

        Category category = Category.builder().id("1").name("Category 1").status("active").build();

        CategoryRepository categoryRepository = Mockito.mock(CategoryRepository.class);
        MenuService menuService = Mockito.mock(MenuService.class);

        Mockito.when(categoryRepository.findById("1")).thenReturn(Optional.of(category));

        CategoryService categoryService = new CategoryService(categoryRepository, menuService);

        categoryService.editCategory(categoryBean);

        ArgumentCaptor<Category> categoryCaptor = ArgumentCaptor.forClass(Category.class);
        Mockito.verify(categoryRepository).save(categoryCaptor.capture());

        Category updatedCategory = categoryCaptor.getValue();
        assertEquals("Updated Category", updatedCategory.getName());
    }

    @Test
    public void testFindAllByStatus() {
        CategoryRepository categoryRepository = Mockito.mock(CategoryRepository.class);
        MenuService menuService = Mockito.mock(MenuService.class);

        List<Category> mockCategories = new ArrayList<>();
        mockCategories.add(Category.builder().id("1").name("Category 1").status("active").build());
        mockCategories.add(Category.builder().id("2").name("Category 2").status("active").build());

        Pageable pageable = PageRequest.of(0, 10);
        Page<Category> mockPage = new PageImpl<>(mockCategories, pageable, mockCategories.size());
        Mockito.when(categoryRepository.findAllByStatus("active", pageable)).thenReturn(mockPage);

        CategoryService categoryService = new CategoryService(categoryRepository, menuService);

        Page<Category> result = categoryService.findAllByStatus(pageable);

        assertEquals(mockPage, result);
    }

}

