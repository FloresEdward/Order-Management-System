package com.champ.oms;

import com.champ.oms.auth.AuthenticationService;
import com.champ.oms.auth.RegisterRequest;
import com.champ.oms.bean.CustomerBean;
import com.champ.oms.service.CustomerService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.champ.oms.document.Role.ADMIN;
import static com.champ.oms.document.Role.MANAGER;

@SpringBootApplication
public class OrderManagementSystem {

	public static void main(String[] args) {
		SpringApplication.run(OrderManagementSystem.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service,
			CustomerService customerService
	) {
		return args -> {
//			var admin = RegisterRequest.builder()
//					.firstname("Admin")
//					.lastname("Admin")
//					.email("admin@mail.com")
//					.password("password")
//					.status("active")
// 					.role(ADMIN)
//					.build();
//			System.out.println("Admin token: " + service.register(admin).getAccessToken());
//
//			var manager = RegisterRequest.builder()
//					.firstname("Admin")
//					.lastname("Admin")
//					.email("manager@mail.com")
//					.password("password")
//			  		.status("inactive")
//					.role(MANAGER)
//					.build();
//			System.out.println("Manager token: " + service.register(manager).getAccessToken());
//

		};
	}
}
