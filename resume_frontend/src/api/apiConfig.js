/**
 * Dynamic API Configuration
 * Supports automatic switching between local and production backends.
 */

// Core production URL (fallback if .env is missing)
const PRODUCTION_BASE_URL = "https://resume-ai-backend-5h2t.onrender.com";
const LOCAL_BASE_URL = "http://localhost:8080";

// Determine which base URL to use
const getBaseURL = () => {
    // 1. Check for manual override in environment variables first
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }

    // 2. If running on localhost and no env var is set, default to local backend
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return LOCAL_BASE_URL;
    }

    // 3. Otherwise, use the production fallback
    return PRODUCTION_BASE_URL;
};

export const API_BASE_URL = getBaseURL();
// Auth URL always appends /api/auth/ and ensures no double slashes
export const API_AUTH_URL = `${API_BASE_URL.replace(/\/$/, '')}/api/auth/`;

console.log(`[API Config] Using Base URL: ${API_BASE_URL}`);
console.log(`[API Config] Using Auth URL: ${API_AUTH_URL}`);
