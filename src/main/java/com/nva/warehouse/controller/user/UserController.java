package com.nva.warehouse.controller.user;

import com.nva.warehouse.model.User;
import com.nva.warehouse.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Objects;

@Controller
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


//    @PostMapping("/login")
//    @ResponseBody
//    public ResponseEntity<?> loginPage(@ModelAttribute User user) { //@RequestBody User user
//        User rs = userService.login(user);
//        System.out.println("KQ:" + rs);
//        System.out.println("POST /login");
//        System.out.println(user);
//        System.out.println(user.getUsername());
//        System.out.println(user.getPassword());
//        if(rs != null)
//            return new ResponseEntity<>(rs, HttpStatus.OK);
//        else
//            return new ResponseEntity<>(rs, HttpStatus.NOT_FOUND);
//    }

    @GetMapping("/register")
    public String registerPage(Model model) {
        return "home/register-page";
    }

//    @PostMapping("/register")
//    public String registerAccount(@RequestParam("name") String name,
//                                  @RequestParam("password") String password, @RequestParam("rePassword") String rePassword
//            , Model model) {
//        System.out.println("hello");
//        if (password != rePassword)
//            model.addAttribute("checkpassword", "Re Password is wrong");
//
//        return "user/users";
//    }

}
