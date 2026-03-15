package com.resume.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class ResumeServiceImpl implements ResumeService {

    private ChatClient chatClient;

    public ResumeServiceImpl(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {

        String promptString = this.loadPromptFromFile("resume_prompt.txt");
        String promptContent = this.putValuesToTemplate(promptString, Map.of(
                "userDescription", userResumeDescription));
        Prompt prompt = new Prompt(promptContent);
        String response = chatClient.prompt(prompt).call().content();
        Map<String, Object> stringObjectMap = parseMultipleResponses(response);
        // modify :
        return stringObjectMap;
    }

    String loadPromptFromFile(String filename) throws IOException {
        try (java.io.InputStream inputStream = new ClassPathResource(filename).getInputStream()) {
            return new String(inputStream.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        }
    }

    String putValuesToTemplate(String template, Map<String, String> values) {
        for (Map.Entry<String, String> entry : values.entrySet()) {
            template = template.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return template;
    }

    public static Map<String, Object> parseMultipleResponses(String response) {
        Map<String, Object> jsonResponse = new HashMap<>();

        // Extract content inside <think> tags
        int thinkStart = response.indexOf("<think>");
        int thinkEnd = response.indexOf("</think>");
        if (thinkStart != -1 && thinkEnd != -1) {
            String thinkContent = response.substring(thinkStart + 7, thinkEnd).trim();
            jsonResponse.put("think", thinkContent);
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
            // Fallback: extract between the first { and last }
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
