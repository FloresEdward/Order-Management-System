package com.champ.oms.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Customer {

    @Id
    private String id;
    private String name;
    private String email;
    private String contactNumber;
    private String address;
    private String paymentMethod;


}
