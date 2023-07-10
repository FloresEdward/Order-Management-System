package com.champ.oms.service;

import com.champ.oms.bean.CustomerBean;
import com.champ.oms.document.Customer;
import com.champ.oms.repo.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public void saveCustomer (CustomerBean customerBean) {
        var customer = Customer.builder()
                .id(new ObjectId().toString())
                .name(customerBean.getName())
                .email(customerBean.getEmail())
                .contactNumber(customerBean.getContactNumber())
                .address(customerBean.getAddress())
                .build();
        customerRepository.save(customer);
    }
}
