package com.resume.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResumeAiBackendApplication {

	public static void main(String[] args) {
		String url = System.getenv("SPRING_DATASOURCE_URL");
		String user = System.getenv("SPRING_DATASOURCE_USERNAME");
		String pass = System.getenv("SPRING_DATASOURCE_PASSWORD");
		
		if (url != null) {
			System.out.println("\n============ DIAGNOSTIC: MANUAL DB TEST ============");
			System.out.println("Testing connection to: " + url);
			try {
				java.sql.Connection conn = java.sql.DriverManager.getConnection(url, user, pass);
				System.out.println("SUCCESS! Connection established perfectly.");
				conn.close();
			} catch (Exception e) {
				System.out.println("FAILED TO CONNECT! Here is the REAL error:");
				e.printStackTrace(System.out);
			}
			System.out.println("====================================================\n");
		}
		
		SpringApplication.run(ResumeAiBackendApplication.class, args);
	}

}
