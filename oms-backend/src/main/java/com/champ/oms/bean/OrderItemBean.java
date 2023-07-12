package com.champ.oms.bean;

import com.champ.oms.document.Category;
import com.champ.oms.document.Customer;
import com.champ.oms.document.Menu;
import com.champ.oms.document.Order;
import com.champ.oms.repo.OrderRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemBean {
    private String category;
    private String product;

    private float price;
    private int quantity;
    private float total;
}
