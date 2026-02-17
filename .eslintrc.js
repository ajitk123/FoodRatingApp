module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "react-native", "react-hooks"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: "module",
    requireConfigFile: false,
  },
  env: {
    "react-native/react-native": true,
    es2022: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/prop-types": "warn",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
  ignorePatterns: [
    "node_modules/",
    "web-build/",
    "dist/",
    "coverage/",
    "*.config.js",
  ],
};
