package com.resume.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResumeServiceImpl implements ResumeService {

    @Value("${GROQ_API_KEY}")
    private String groqApiKey;

    @Value("${GROQ_MODEL:llama-3.1-8b-instant}")
    private String groqModel;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {
        String promptString = loadPromptFromFile("resume_prompt.txt");
        String promptContent = promptString.replace("{{userDescription}}", userResumeDescription);

        // Build request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", groqModel);
        requestBody.put("messages", List.of(
            Map.of("role", "user", "content", promptContent)
        ));
        requestBody.put("temperature", 0.7);
        requestBody.put("max_tokens", 4096);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> responseEntity = restTemplate.exchange(
            GROQ_API_URL, HttpMethod.POST, entity, Map.class);

        Map responseBody = responseEntity.getBody();
        String content = "";
        if (responseBody != null) {
            List choices = (List) responseBody.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map choice = (Map) choices.get(0);
                Map message = (Map) choice.get("message");
                content = (String) message.get("content");
            }
        }

        return parseMultipleResponses(content);
    }

    String loadPromptFromFile(String filename) throws IOException {
        try (java.io.InputStream inputStream = new ClassPathResource(filename).getInputStream()) {
            return new String(inputStream.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        }
    }

    public static Map<String, Object> parseMultipleResponses(String response) {
        Map<String, Object> jsonResponse = new HashMap<>();

        // Extract content inside <think> tags
        int thinkStart = response.indexOf("<think>");
        int thinkEnd = response.indexOf("</think>");
        if (thinkStart != -1 && thinkEnd != -1) {
            jsonResponse.put("think", response.substring(thinkStart + 7, thinkEnd).trim());
        } else {
            jsonResponse.put("think", null);
        }

        // Extract JSON content
        String jsonContent = null;
        int jsonStartMatch = response.indexOf("```json");
        int jsonEndMatch = response.lastIndexOf("```");
        if (jsonStartMatch != -1 && jsonEndMatch != -1 && jsonStartMatch < jsonEndMatch) {
            jsonContent = response.substring(jsonStartMatch + 7, jsonEndMatch).trim();
        } else {
            int firstBrace = response.indexOf("{");
            int lastBrace = response.lastIndexOf("}");
            if (firstBrace != -1 && lastBrace != -1 && firstBrace < lastBrace) {
                jsonContent = response.substring(firstBrace, lastBrace + 1).trim();
            }
        }

        if (jsonContent != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> dataContent = objectMapper.readValue(jsonContent, Map.class);
                jsonResponse.put("data", dataContent);
            } catch (Exception e) {
                jsonResponse.put("data", null);
                System.err.println("Invalid JSON format in the response: " + e.getMessage());
            }
        } else {
            jsonResponse.put("data", null);
        }

        return jsonResponse;
    }
}
