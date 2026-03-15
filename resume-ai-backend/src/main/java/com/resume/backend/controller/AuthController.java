package com.resume.backend.controller;

import com.resume.backend.model.User;
import com.resume.backend.payload.request.LoginRequest;
import com.resume.backend.payload.request.SignupRequest;
import com.resume.backend.payload.response.JwtResponse;
import com.resume.backend.payload.response.MessageResponse;
import com.resume.backend.repository.UserRepository;
import com.resume.backend.security.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    logger.info("Sign-in attempt for user: {}", loginRequest.getUsername());

    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.generateJwtToken(authentication);
      
      UserDetails userDetails = (UserDetails) authentication.getPrincipal();    
      List<String> roles = userDetails.getAuthorities().stream()
          .map(item -> item.getAuthority())
          .collect(Collectors.toList());

      User user = userRepository.findByUsername(userDetails.getUsername()).get();
      
      logger.info("Successfully authenticated user: {}", user.getUsername());

      return ResponseEntity.ok(new JwtResponse(jwt, 
                           user.getId(), 
                           user.getUsername(), 
                           user.getEmail(), 
                           roles));
    } catch (Exception e) {
       logger.error("Authentication failed for user {}: {}", loginRequest.getUsername(), e.getMessage());
       throw e; // Let Spring handle it
    }
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    logger.info("Registration attempt for user: {} with email: {}", signUpRequest.getUsername(), signUpRequest.getEmail());
    
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      logger.warn("Registration failed: Username {} is already taken", signUpRequest.getUsername());
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      logger.warn("Registration failed: Email {} is already in use", signUpRequest.getEmail());
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = User.builder()
            .username(signUpRequest.getUsername())
            .email(signUpRequest.getEmail())
            .password(encoder.encode(signUpRequest.getPassword()))
            .build();

    Set<String> strRoles = signUpRequest.getRoles();
    Set<String> roles = new HashSet<>();

    if (strRoles == null) {
      roles.add("ROLE_USER");
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          roles.add("ROLE_ADMIN");
          break;
        case "mod":
          roles.add("ROLE_MODERATOR");
          break;
        default:
          roles.add("ROLE_USER");
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
