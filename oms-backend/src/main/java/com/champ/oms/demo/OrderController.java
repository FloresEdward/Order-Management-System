package com.champ.oms.demo;

import com.champ.oms.bean.OrderBean;
import com.champ.oms.document.Menu;
import com.champ.oms.document.Order;
import com.champ.oms.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/")
    @PreAuthorize("hasAuthority('order:create')")
    public void createOrder(@RequestBody OrderBean orderBean) {
        orderService.saveOrder(orderBean);
    }

    @GetMapping("/getActive")
    @PreAuthorize("hasAuthority('order:read')")
    public List<Order> getOrders() {
        return orderService.getAllActiveOrders();
    }

//    @GetMapping("/getAll")
//    public List<Order> getAllOrders() {
//        return orderService.getAllOrders();
//    }

    @GetMapping("/paginated")
    @PreAuthorize("hasAuthority('order:read')")
    public Page<Order> getOrderItemsPaginated(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "updatedDate");
        PageRequest pageable = PageRequest.of(page, size, sort);
        return orderService.getAllOrders(pageable);
    }
//    @PostMapping("/cancel/{id}")
//    @PreAuthorize("hasAuthority('order:delete')")
//    public ResponseEntity<?> deleteOrder(@PathVariable String id) {
//        try {
//            orderService.updateOrderStatusAsCancel(id, "Cancelled");
//            return ResponseEntity.status(HttpStatus.OK).build();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    @PostMapping(value = "/fulfill")
    @PreAuthorize("hasAuthority('order:update')")
    public ResponseEntity<?> fulfillOrder(@RequestBody OrderBean order) {
        try {
            orderService.fullFilledOrder(order);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/cancel")
    @PreAuthorize("hasAuthority('order:update')")
    public ResponseEntity<?> cancelOrder(@RequestBody OrderBean order) {

        try{
            orderService.cancelledOrder(order);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
