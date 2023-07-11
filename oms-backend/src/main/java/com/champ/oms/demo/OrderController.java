package com.champ.oms.demo;

import com.champ.oms.bean.OrderBean;
import com.champ.oms.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/management/order")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private final OrderService orderService;

    @PostMapping("/")
    public void createOrder(@RequestBody OrderBean orderBean) {
        orderService.saveOrder(orderBean);
    }

}
