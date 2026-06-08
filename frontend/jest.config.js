module.exports = {
  testEnvironment: "jsdom",
  // CRA uses babel-jest internally; this config only helps resolve ESM quirks
  moduleNameMapper: {
    "^react-router-dom$": "react-router-dom"
  }
};

