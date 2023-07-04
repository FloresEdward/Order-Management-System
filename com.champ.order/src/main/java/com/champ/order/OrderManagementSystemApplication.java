package com.champ.order;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.champ.order.dao.UserDao")
public class OrderManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderManagementSystemApplication.class, args);
	}

}
