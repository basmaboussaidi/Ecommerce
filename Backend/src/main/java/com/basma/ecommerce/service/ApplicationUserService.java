package com.basma.ecommerce.service;

import com.basma.ecommerce.model.ApplicationUser;
import com.basma.ecommerce.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class ApplicationUserService  implements UserDetailsService {

    @Autowired
    private ApplicationUserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ApplicationUser create(ApplicationUser user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return null;
        }
        if (user.getAuthorities() == null) {
            user.setAuthorities(new HashSet<>());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        ApplicationUser user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        return user;
    }


}
