import { defineConfig } from "drizzle-kit";

process.loadEnvFile();

export default defineConfig({
  schema: "./src/db/tables",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DIRECT_CONNECTION_STRING!,
  },
});
