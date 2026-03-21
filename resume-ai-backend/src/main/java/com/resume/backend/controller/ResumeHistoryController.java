package com.resume.backend.controller;

import com.resume.backend.model.ResumeHistory;
import com.resume.backend.model.User;
import com.resume.backend.repository.ResumeHistoryRepository;
import com.resume.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/resume/history")
public class ResumeHistoryController {

    @Autowired
    private ResumeHistoryRepository resumeHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userRepository.findByUsername(username).orElse(null);
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<?> getAllResumes() {
        User user = getCurrentUser();
        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        List<ResumeHistory> history = resumeHistoryRepository.findByUserOrderByCreatedAtDesc(user);
        
        // Map to DTO to avoid sending entire User object
        List<Map<String, Object>> response = history.stream().map(h -> {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", h.getId());
            map.put("title", h.getTitle());
            map.put("prompt", h.getPrompt());
            map.put("createdAt", h.getCreatedAt());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getResumeById(@PathVariable Long id) {
        User user = getCurrentUser();
        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<ResumeHistory> resume = resumeHistoryRepository.findByIdAndUser(id, user);
        if (resume.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> response = new java.util.HashMap<>();
        response.put("id", resume.get().getId());
        response.put("title", resume.get().getTitle());
        response.put("prompt", resume.get().getPrompt());
        response.put("resumeData", resume.get().getResumeData());
        response.put("createdAt", resume.get().getCreatedAt());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(@PathVariable Long id) {
        User user = getCurrentUser();
        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<ResumeHistory> resume = resumeHistoryRepository.findByIdAndUser(id, user);
        if (resume.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Long resumeId = resume.get().getId();
        if (resumeId != null) {
            resumeHistoryRepository.deleteById(resumeId);
        } else {
            resumeHistoryRepository.delete(resume.get());
        }
        return ResponseEntity.ok(Map.of("message", "Resume deleted successfully"));
    }
}
