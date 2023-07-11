package com.champ.oms.demo;

import com.champ.oms.bean.CustomerBean;
import com.champ.oms.document.Category;
import com.champ.oms.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/management/customer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http//localhost:4200")
public class CustomerController {

    @Autowired
    private final CustomerService customerService;

    @PostMapping("/")
    public void addCustomer(@RequestBody CustomerBean customerBean) {
        customerService.saveCustomer(customerBean);
    }
}
