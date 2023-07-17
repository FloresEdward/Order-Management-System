package com.champ.oms.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.*;
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
    @CreatedBy
    private User createdBy;
    @LastModifiedBy
    private User lastModifiedBy;
    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date updatedDate;
}
