export default [
  {
    extends: ["@rocketseat/eslint-config/node"],
    files: ["src/**/*.ts"],
    ignores: ["./build", "!**/eslint.config.js", "./node_modules", "./prisma/*"],
    rules: {
        semi: "error"
    }
  }
];