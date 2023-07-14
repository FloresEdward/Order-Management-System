package com.champ.oms.service;

import com.champ.oms.bean.OrderBean;
import com.champ.oms.bean.OrderItemBean;
import com.champ.oms.document.Menu;
import com.champ.oms.document.Order;
import com.champ.oms.repo.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuService menuService;
    public void saveOrder(OrderBean orderBean) {
        var order = Order.builder()
                .customer(orderBean.getCustomer())
                .creatorId(orderBean.getCreatorId())
                .courierName(orderBean.getCourierName())
                .addressId(orderBean.getAddressId())
                .orderedItems(orderBean.getOrderedItems())
//                .quantity(orderBean.getQuantity())
                .totalQuantity(orderBean.getTotalQuantity())
                .grandTotal(orderBean.getGrandTotal())
                .status(orderBean.getStatus())
                .createdAt(orderBean.getCreatedAt())
                .fulfilledDate(orderBean.getFulfilledDate())
                .build();

        menuService.updateOrderItemBeans(orderBean.getOrderedItems());
        orderRepository.save(order);
    }

//    public List<Order> getAllOrders() {
//        return orderRepository.findAll();
//    }

    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public List<Order> getAllActiveOrders() {
        return orderRepository.findByStatus("pending");
    }

    public void updateOrderStatusAsCancel(String orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderId));
        order.setStatus(status);
        orderRepository.save(order);
    }

    public void updateOrderStatusAsFulfilled(String orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderId));
        order.setStatus(status);
        orderRepository.save(order);
    }

    public void updateCourier(String orderId, String courierName) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderId));
        order.setCourierName(courierName);
        orderRepository.save(order);
    }

    public void fullFilledOrder(OrderBean orderBean) {
        Order order = orderRepository.findById(orderBean.getId())
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderBean.getId()));
        order.setCourierName(orderBean.getCourierName());
        order.setStatus("fulfilled");
        orderRepository.save(order);
    }

    public void cancelledOrder(OrderBean orderBean) {
        Order order = orderRepository.findById(orderBean.getId())
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderBean.getId()));
        order.setCourierName(orderBean.getCourierName());
        order.setStatus("cancelled");
        orderRepository.save(order);
    }

    class OrderNotFoundException extends RuntimeException {

        public OrderNotFoundException(String message) {
            super(message);
        }
    }
}