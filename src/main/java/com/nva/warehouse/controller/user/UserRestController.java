package com.nva.warehouse.controller.user;

import com.nva.warehouse.model.User;
import com.nva.warehouse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserRestController {
    @Autowired
    private UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<?> loginPage(HttpServletResponse response, @RequestBody User user) {
        User rs = userService.login(user);
        if(rs != null) {
            response.addCookie(new Cookie("id", rs.getId().toString()));
            response.addCookie(new Cookie("username", rs.getUsername()));
            return new ResponseEntity<>(rs, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(rs, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<User> registerNewUser(@RequestBody User user) {
        return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/user")
    @ResponseBody
    public List<User> getUser()
    {
        return userService.getAllUsers();
    }
}
