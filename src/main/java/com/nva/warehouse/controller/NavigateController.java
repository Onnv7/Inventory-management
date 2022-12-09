package com.nva.warehouse.controller;

import com.nva.warehouse.model.User;
import com.nva.warehouse.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
public class NavigateController {


    @GetMapping(value = {"/", "/home"})
    public String home(Model model) {
        System.out.println("Home");
        model.addAttribute("user", new User());
        return "home/home-page";
    }
//    private UserService userService;
//
//    public NavigateController(UserService userService) {
//        this.userService = userService;
//    }
//
//
//    @GetMapping("/")
//    public String registerPage(Model model) {
//        return "home/home-page";
//    }
////
//    @GetMapping("/home")
//    public String home(Model model) {
//        System.out.println("Home");
//        return "This is home page";
//    }
//
////    @GetMapping("/error")
////    public String errorPage(Model model) {
////        System.out.println("O");
////        return "error/error";
////    }
}
