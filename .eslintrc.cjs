module.exports = {
  root: true,
  ignorePatterns: ["node_modules/", "**/dist/**", "**/.next/**"],
  env: {
    node: true,
    browser: true,
    es2024: true,
  },
  extends: ["eslint:recommended"],
  rules: {},
};
