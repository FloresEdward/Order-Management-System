package com.champ.oms.demo;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/demo-controller")
//@Hidden
public class DemoController {

  @GetMapping
  public ResponseEntity<?> sayHello() {
    return ResponseEntity.ok(new HashMap<String, String>(){{
      put("message", "Hello from secured endpoint");
    }});
  }

}
