package com.example.chou.Security;

import com.example.chou.model.Admin;
import com.example.chou.model.User;
import com.example.chou.repository.AdminRepository;
import com.example.chou.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    UserRepository userRepository;

    @Bean
    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("mail is : " + username);
        User loclaUser=userRepository.findByMail(username);
        if(loclaUser!=null){
            org.springframework.security.core.userdetails.User springUser=new org.springframework.security.core.userdetails.User(loclaUser.getMail(),loclaUser.getPassword(),loclaUser.getEnabel(),true,true,true,new ArrayList<>());
            return springUser;
        }
        return null;
    }

    public String encodePassword(String password) {
        return passwordEncoder().encode(password);

    }

    public void save(Admin admin) {
        admin.setPassword(encodePassword(admin.getPassword()));
        adminRepository.save(admin);
    }

    public List<User> findall() {
        return userRepository.findAll();
    }
}
