module.exports = {
  preset: "react-native",
  setupFilesAfterSetup: ["./jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/web-build/", "/dist/"],
  collectCoverageFrom: [
    "app/**/*.{js,jsx}",
    "!app/**/*.test.{js,jsx}",
    "!app/**/index.js",
  ],
  coverageThresholds: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|react-native-vector-icons|react-native-star-rating|react-native-maps|@realm)/)",
  ],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
};
