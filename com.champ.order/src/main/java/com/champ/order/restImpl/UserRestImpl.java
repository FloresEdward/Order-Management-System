package com.champ.order.restImpl;

import com.champ.order.constants.OrderConstants;
import com.champ.order.rest.UserRest;
import com.champ.order.service.UserService;
import com.champ.order.utils.OrderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    UserService userService;
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try {
            return userService.signUp(requestMap);
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return OrderUtils.getResponseEntity(OrderConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
