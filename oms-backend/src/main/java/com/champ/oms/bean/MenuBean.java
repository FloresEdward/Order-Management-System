package com.champ.oms.bean;

import com.champ.oms.document.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenuBean {
    private String id;
    private String name;
    private String description;
    private Category category;
    private float price;
    private long stock;
    private String status;
}
