package com.champ.oms.bean;

import com.champ.oms.document.Customer;
import com.champ.oms.document.Menu;
import com.champ.oms.document.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderBean {

    private String id;
    private Customer customer;
    private String creatorId;
    private String courierId;
    private String addressId;
    private List<OrderItemBean> orderItems;
    private int quantity;
    private float grandTotal;
    private String status;
    private Date createdAt;
    private Date fulfilledDate;

}
