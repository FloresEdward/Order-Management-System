package com.champ.oms.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerBean {

    private String name;
    private String email;
    private String contactNumber;
    private String address;
    private String paymentMethod;
}
