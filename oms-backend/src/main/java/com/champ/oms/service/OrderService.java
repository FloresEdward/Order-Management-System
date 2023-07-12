package com.champ.oms.service;

import com.champ.oms.bean.OrderBean;
import com.champ.oms.bean.OrderItemBean;
import com.champ.oms.document.Order;
import com.champ.oms.repo.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

//    public void saveOrder(List<OrderItemBean> orderItemBean) {
//        var order = Order.builder()
////                .id(new ObjectId().toString())
////                .courierId(orderBean.getCourierId())
////                .deliveryAddressId(orderBean.getDeliveryAddressId())
////                .orderItems(orderBean.getOrderItems())
////                .quantity(orderBean.getQuantity())
//                .orderItems(orderItemBean)
//                .build();
//        orderRepository.save(order);
//    }
    public void saveOrder(OrderBean orderBean) {
        var order = Order.builder()
                .customer(orderBean.getCustomer())
                .creatorId(orderBean.getCreatorId())
                .courierId(orderBean.getCourierId())
                .addressId(orderBean.getAddressId())
                .orderItems(orderBean.getOrderItems())
                .quantity(orderBean.getQuantity())
                .grandTotal(orderBean.getGrandTotal())
                .status(orderBean.getStatus())
                .createdAt(orderBean.getCreatedAt())
                .fulfilledDate(orderBean.getFulfilledDate())
                .build();
        orderRepository.save(order);
    }

}
