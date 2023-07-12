package com.champ.oms.document;

import com.champ.oms.bean.OrderItemBean;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Order {

    @Id
    private String id;
    private Customer customerId;
    private String creatorId;
    private String courierId; // ?
    private String deliveryAddressId;
    private List<OrderItemBean> orderItems;
    private String quantity;
    private String status;
    private Date createdAt;
    private Date fulfilledDate;

}
