package com.example.chou.utils;

import com.example.chou.Security.UserService;
import com.example.chou.enums.UserRole;
import com.example.chou.model.Admin;
import com.example.chou.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class FirstTimeInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        if (userService.findall().isEmpty()) {
            Admin admin = new Admin("admin@admin.com", "anas123", "admin", UserRole.ADMIN.getRole());
            userService.save(admin);
        }

    }
}
