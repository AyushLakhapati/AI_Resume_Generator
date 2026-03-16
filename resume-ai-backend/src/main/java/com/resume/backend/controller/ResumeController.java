package com.resume.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.backend.ResumeRequest;
import com.resume.backend.model.ResumeHistory;
import com.resume.backend.model.User;
import com.resume.backend.repository.ResumeHistoryRepository;
import com.resume.backend.repository.UserRepository;
import com.resume.backend.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private final ResumeService resumeService;
    private final ResumeHistoryRepository resumeHistoryRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ResumeController(ResumeService resumeService, ResumeHistoryRepository resumeHistoryRepository, UserRepository userRepository, ObjectMapper objectMapper) {
        this.resumeService = resumeService;
        this.resumeHistoryRepository = resumeHistoryRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> getResumeData(
            @RequestBody ResumeRequest resumeRequest
    ) throws IOException {

        Map<String, Object> stringObjectMap = resumeService.generateResumeResponse(resumeRequest.userDescription());
        
        // Auto-save resume history if user is authenticated
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof UserDetails) {
                String username = ((UserDetails) principal).getUsername();
                User user = userRepository.findByUsername(username).orElse(null);
                
                if (user != null) {
                    String resumeDataJson = objectMapper.writeValueAsString(stringObjectMap);
                    ResumeHistory history = new ResumeHistory(user, resumeRequest.userDescription(), resumeDataJson);
                    resumeHistoryRepository.save(history);
                }
            }
        } catch (Exception e) {
            // Log error but don't fail the request if saving history fails
            System.err.println("Could not save resume history: " + e.getMessage());
        }

        return new ResponseEntity<>(stringObjectMap, HttpStatus.OK);
    }
}

