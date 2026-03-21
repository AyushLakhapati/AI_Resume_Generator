package com.resume.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public Map<String, Object> checkHealth() {
        Map<String, Object> status = new HashMap<>();
        try {
            jdbcTemplate.execute("SELECT 1");
            status.put("database", "UP");
            
            // Check if tables exist
            try {
                jdbcTemplate.execute("SELECT COUNT(*) FROM users");
                status.put("users_table", "EXISTS");
            } catch (Exception e) {
                status.put("users_table", "MISSING: " + e.getMessage());
            }
            
            try {
                jdbcTemplate.execute("SELECT COUNT(*) FROM user_roles");
                status.put("roles_table", "EXISTS");
            } catch (Exception e) {
                status.put("roles_table", "MISSING: " + e.getMessage());
            }

            try {
                jdbcTemplate.execute("SELECT COUNT(*) FROM resume_history");
                status.put("history_table", "EXISTS");
            } catch (Exception e) {
                status.put("history_table", "MISSING: " + e.getMessage());
            }

        } catch (Exception e) {
            status.put("database", "DOWN: " + e.getMessage());
        }
        return status;
    }
}
