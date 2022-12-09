package com.nva.warehouse.service;

import com.nva.warehouse.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User login(User user);
    User saveUser(User user);

}
