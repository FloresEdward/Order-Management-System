package com.champ.oms.service;

import com.champ.oms.bean.OrderBean;
import com.champ.oms.document.Order;
import com.champ.oms.repo.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public void saveOrder(OrderBean orderBean) {
        var order = Order.builder()
                .id(new ObjectId().toString())
                .courierId(orderBean.getCourierId())
                .deliveryAddressId(orderBean.getDeliveryAddressId())
                .orderItems(orderBean.getOrderItems())
                .quantity(orderBean.getQuantity())
                .build();
        orderRepository.save(order);
    }
}
