package com.champ.oms.bean;

import com.champ.oms.document.Customer;
import com.champ.oms.document.Menu;
import com.champ.oms.document.Order;
import com.champ.oms.document.User;
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
    private String courierName;
    private String addressId;
    private List<OrderItemBean> orderedItems;
    private int totalQuantity;
    private float grandTotal;
    private String status;
    private Date createdAt;
    private Date fulfilledDate;

}
