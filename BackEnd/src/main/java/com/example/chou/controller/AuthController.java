package com.example.chou.controller;

import com.example.chou.Security.JwtResponse;
import com.example.chou.Security.SignInRequest;
import com.example.chou.Security.TokenUtil;
import com.example.chou.Security.UserService;
import com.example.chou.model.User;
import com.example.chou.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = {"/auth"})

    public JwtResponse signIn(@RequestBody SignInRequest signInRequest) {
        UserDetails userDetails = userService.loadUserByUsername(signInRequest.getUsername());
        JwtResponse response = new JwtResponse(null, null, null);
        if (userDetails.isEnabled() ) {
            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = tokenUtil.generateToken(userDetails);
            String refreshtToken = tokenUtil.generateRefreshtToken(userDetails);
            //String role = tokenUtil.generateRefreshtToken(userDetails);
            User user = userRepository.findUserByMail(signInRequest.getUsername());
            response = new JwtResponse(token, refreshtToken, user);
        }

        return response;

    }

}









