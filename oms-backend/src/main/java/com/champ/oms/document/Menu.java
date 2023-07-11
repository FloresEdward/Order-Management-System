package com.champ.oms.document;

import com.champ.oms.bean.CategoryBean;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Menu {

    @Id
    private String id;
    private String name;
    private String description;
    private Category category;
    private float price;
    private long stock;
    private String status;
    private String creatorId;
    private String modifierId;
    private Date createdAt;
    private Date updatedAt;
}
