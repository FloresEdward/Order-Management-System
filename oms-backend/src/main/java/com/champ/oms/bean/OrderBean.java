package com.champ.oms.bean;

import com.champ.oms.document.Customer;
import com.champ.oms.document.Menu;
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

    private Customer customerId;
    private String creatorId;
    private String courierId;
    private String deliveryAddressId;
    private List<Menu> orderItems;
    private String quantity;
    private String status;
    private Date createdAt;
    private Date fulfilledDate;

}
