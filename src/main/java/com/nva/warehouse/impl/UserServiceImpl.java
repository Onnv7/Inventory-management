package com.nva.warehouse.impl;

import com.nva.warehouse.model.User;
import com.nva.warehouse.repository.UserRepository;
import com.nva.warehouse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
//    public UserServiceImpl(UserRepository userRepository) {
//
//        this.userRepository = userRepository;
//    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User login(User user) {
        User rs = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());

        return rs;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
