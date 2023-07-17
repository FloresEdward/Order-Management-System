package com.champ.oms;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Order Management System"
                ),
                description = "OpenApi documentation for Order Management System",
                title = "Order Management System API Documentation",
                version = "1.0.0"
        )
)
public class OpenApiConfig {
}
