package com.example.chou.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final String[] PUBLIC_ENDPOINTS = {
            "/admin/auth/**", "/client/auth/**", "/user/auth/**", "/fournisseur/auth/**", "/fournisseur/appuser/**", "/user/auth/**", "/user/**", "/fournisseur/img/**", "/client/img/**", "/article/files/**", "/fournisseur/files/**", "/client/files/**"
    };

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    AuthFilter authFilter() {
        return new AuthFilter();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(PUBLIC_ENDPOINTS).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(authFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
