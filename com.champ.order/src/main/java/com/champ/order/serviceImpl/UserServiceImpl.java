package com.champ.order.serviceImpl;

import com.champ.order.constants.OrderConstants;
import com.champ.order.dao.UserDao;
import com.champ.order.POJO.User;
import com.champ.order.service.UserService;
import com.champ.order.utils.OrderUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServiceImpl implements UserService  {

    @Autowired
    UserDao userDao;
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {
            if (validateSignUpMap(requestMap)) {
                User user = userDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(user)) {
                    userDao.save(getUserFormMap(requestMap));
                    return OrderUtils.getResponseEntity("Successfully Registered", HttpStatus.OK);
                } else {
                    return OrderUtils.getResponseEntity("Email already exist", HttpStatus.BAD_REQUEST);
                }
            } else {
                return OrderUtils.getResponseEntity(OrderConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex) {
            return OrderUtils.getResponseEntity(OrderConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean validateSignUpMap(Map<String, String> requestMap) {
        if(requestMap.containsKey("firstName") && requestMap.containsKey("lastName")
                && requestMap.containsKey("email") && requestMap.containsKey("password")) {
            return true;
        }
        return false;
    }

    private User getUserFormMap(Map<String, String> requestMap) {
        User user = new User();
        user.setFirstName(requestMap.get("firstName"));
        user.setLastName(requestMap.get("lastName"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        user.setRoleId(Long.valueOf(Integer.valueOf(requestMap.get("roleId"))));
        user.setStatus(User.UserStatus.valueOf("false"));

        return user;
    }
}
