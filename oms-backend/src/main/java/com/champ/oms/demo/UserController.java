package com.champ.oms.demo;

import com.champ.oms.document.User;
import com.champ.oms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/management/user")
//@PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNT', 'ORDER')")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/getAll")
//    @PreAuthorize("hasAuthority('account:read')")
    public Iterable<User> getUsers() {
        return userService.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    @PreAuthorize("hasAuthority('account:update')")
    public User update(@RequestBody User user, @PathVariable(name = "id") String _id) {
        user.setId(_id);
        userService.updateUser(user);
        return user;
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('account:delete')")
    public void delete(@PathVariable("id") String _id) {
        userService.deleteUser(_id);
    }
}
