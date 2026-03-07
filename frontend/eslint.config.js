import globals from "globals"
import js from "@eslint/js"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
    globalIgnores(["dist"]),
    {
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            tseslint.configs.recommended
        ],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        }
    }
])
