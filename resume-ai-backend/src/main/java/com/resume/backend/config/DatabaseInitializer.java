package com.resume.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("========== DB INITIALIZER: ENSURING TABLES EXIST ==========");
        
        try {
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS users (" +
                    "id BIGINT AUTO_INCREMENT PRIMARY KEY, " +
                    "username VARCHAR(50) NOT NULL UNIQUE, " +
                    "email VARCHAR(100) NOT NULL UNIQUE, " +
                    "password VARCHAR(120) NOT NULL)");
            System.out.println("Users table checked/created.");
        } catch (Exception e) {
            System.err.println("Failed to create users table: " + e.getMessage());
        }

        try {
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS user_roles (" +
                    "user_id BIGINT NOT NULL, " +
                    "role VARCHAR(255), " +
                    "FOREIGN KEY (user_id) REFERENCES users(id))");
            System.out.println("User_roles table checked/created.");
        } catch (Exception e) {
            System.err.println("Failed to create user_roles table: " + e.getMessage());
        }

        try {
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS resume_history (" +
                    "id BIGINT AUTO_INCREMENT PRIMARY KEY, " +
                    "user_id BIGINT NOT NULL, " +
                    "title VARCHAR(255), " +
                    "prompt TEXT NOT NULL, " +
                    "resume_data LONGTEXT NOT NULL, " +
                    "created_at DATETIME NOT NULL, " +
                    "FOREIGN KEY (user_id) REFERENCES users(id))");
            System.out.println("Resume_history table checked/created.");
        } catch (Exception e) {
            System.err.println("Failed to create resume_history table: " + e.getMessage());
        }
        
        System.out.println("===========================================================");
    }
}
