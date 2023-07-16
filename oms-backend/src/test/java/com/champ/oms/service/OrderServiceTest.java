package com.champ.oms.service;

import com.champ.oms.bean.OrderBean;
import com.champ.oms.document.Order;
import com.champ.oms.repo.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderServiceTest {
    @Mock
    private MenuService menuService;

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void saveOrder() {
        OrderBean orderBean = new OrderBean();

        orderService.saveOrder(orderBean);

        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(menuService, times(1)).updateOrderItemBeans(orderBean.getOrderedItems());
        verify(orderRepository, times(1)).save(orderCaptor.capture());

        Order capturedOrder = orderCaptor.getValue();
        assertEquals(orderBean.getCustomer(), capturedOrder.getCustomer());
        assertEquals(orderBean.getCreatorId(), capturedOrder.getCreatorId());
        assertEquals(orderBean.getCourierName(), capturedOrder.getCourierName());
        assertEquals(orderBean.getAddressId(), capturedOrder.getAddressId());
        assertEquals(orderBean.getOrderedItems(), capturedOrder.getOrderedItems());
    }

    @Test
    public void testGetAllOrders() {
        Order order1 = new Order();
        Order order2 = new Order();

        List<Order> expectedOrders = Arrays.asList(order1, order2);
        when(orderRepository.findAll()).thenReturn(expectedOrders);

        List<Order> actualOrders = orderService.getAllOrders();

        verify(orderRepository, times(1)).findAll();
        assertEquals(expectedOrders.size(), actualOrders.size());
    }

    @Test
    public void testGetAllOrdersHistory() {
        List<Order> orders = Arrays.asList(new Order(), new Order());
        Pageable pageable = mock(Pageable.class);
        Page<Order> expectedPage = new PageImpl<>(orders);
        when(orderRepository.findAll(pageable)).thenReturn(expectedPage);

        Page<Order> actualPage = orderService.getAllOrdersHistory(pageable);

        verify(orderRepository, times(1)).findAll(pageable);
        assertEquals(expectedPage, actualPage);
    }

    @Test
    public void testGetAllActiveOrders() {
        List<Order> expectedOrders = Arrays.asList(new Order(), new Order());
        when(orderRepository.findByStatus("pending")).thenReturn(expectedOrders);

        List<Order> actualOrders = orderService.getAllActiveOrders();

        verify(orderRepository, times(1)).findByStatus("pending");
        assertEquals(expectedOrders, actualOrders);
    }

    @Test
    public void testUpdateOrderStatusAsCancel() {
        String orderId = "123";
        String status = "cancelled";
        Order order = new Order();
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));

        orderService.updateOrderStatusAsCancel(orderId, status);

        verify(orderRepository, times(1)).findById(orderId);
        verify(orderRepository, times(1)).save(order);
        assertEquals(status, order.getStatus());
    }

    @Test
    public void testUpdateOrderStatusAsFulfilled() {
        String orderId = "123";
        String status = "fulfilled";
        Order order = new Order();
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));

        orderService.updateOrderStatusAsFulfilled(orderId, status);

        verify(orderRepository, times(1)).findById(orderId);
        verify(orderRepository, times(1)).save(order);
        assertEquals(status, order.getStatus());
    }

    @Test
    public void testUpdateCourier() {
        String orderId = "123";
        String courierName = "Courier XYZ";
        Order order = new Order();
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));

        orderService.updateCourier(orderId, courierName);

        verify(orderRepository, times(1)).findById(orderId);
        verify(orderRepository, times(1)).save(order);
        assertEquals(courierName, order.getCourierName());
    }

    @Test
    public void testFullFilledOrder() {
        OrderBean orderBean = new OrderBean();
        orderBean.setId("123");
        orderBean.setCourierName("Courier XYZ");
        Order order = new Order();
        when(orderRepository.findById(orderBean.getId())).thenReturn(Optional.of(order));

        orderService.fullFilledOrder(orderBean);

        verify(orderRepository, times(1)).findById(orderBean.getId());
        verify(orderRepository, times(1)).save(order);
        assertEquals(orderBean.getCourierName(), order.getCourierName());
        assertEquals("fulfilled", order.getStatus());
    }

    @Test
    public void testCancelledOrder() {
        OrderBean orderBean = new OrderBean();
        orderBean.setId("123");
        orderBean.setCourierName("Courier XYZ");
        Order order = new Order();
        when(orderRepository.findById(orderBean.getId())).thenReturn(Optional.of(order));

        orderService.cancelledOrder(orderBean);

        verify(orderRepository, times(1)).findById(orderBean.getId());
        verify(orderRepository, times(1)).save(order);
        assertEquals(orderBean.getCourierName(), order.getCourierName());
        assertEquals("cancelled", order.getStatus());
    }
}