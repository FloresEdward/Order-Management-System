package com.champ.oms.demo;

import com.champ.oms.bean.OrderBean;
import com.champ.oms.bean.OrderItemBean;
import com.champ.oms.document.Order;
import com.champ.oms.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/management/order")
@PreAuthorize("hasAnyRole('CATEGORY', 'ADMIN', 'TELLER', 'MENU', 'ORDER', 'RIDER', 'ACCOUNT')")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private final OrderService orderService;

//    @PostMapping("/")
//    public void createOrder(@RequestBody List<OrderItemBean> orderItemBean) {
//        orderService.saveOrder(orderItemBean);
//    }

    @PostMapping("/")
    @PreAuthorize("hasAuthority('order:create')")
    public void createOrder(@RequestBody OrderBean orderBean) {
        orderService.saveOrder(orderBean);
    }

    @GetMapping("/")
    @PreAuthorize("hasAuthority('order:read')")
    public List<Order> getOrders() {
        return orderService.getAllActiveOrders();
    }

    @GetMapping("/getAll")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

}
