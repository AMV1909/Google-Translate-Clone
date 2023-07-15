/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "https://amv1909.github.io/Google-Translate-Clone/",
    test: {
        environment: "happy-dom",
    },
});
