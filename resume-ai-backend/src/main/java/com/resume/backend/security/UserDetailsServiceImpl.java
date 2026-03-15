package com.resume.backend.security;

import com.resume.backend.model.User;
import com.resume.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

  @Autowired
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    logger.info("Attempting to load user by username: {}", username);
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> {
            logger.warn("User not found with username: {}", username);
            return new UsernameNotFoundException("User Not Found with username: " + username);
        });

    logger.info("User found: {}, password starts with: {}", user.getUsername(), 
        user.getPassword() != null && user.getPassword().length() > 5 ? user.getPassword().substring(0, 5) : "null/short");

    return org.springframework.security.core.userdetails.User.builder()
        .username(user.getUsername())
        .password(user.getPassword())
        .authorities(user.getRoles().stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList()))
        .build();
  }
}
