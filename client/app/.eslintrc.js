module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["airbnb", "airbnb-typescript", "next/core-web-vitals"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    project: ["./**/**/tsconfig.json", "*/tsconfig.json"]
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "import/prefer-default-export": 0,
    "react/function-component-definition": 0,
    "react/jsx-props-no-spreading": 0,
    "@typescript-eslint/object-curly-spacing": 0,
    "@typescript-eslint/lines-between-class-members": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/label-has-associated-control": [ 2, {
      "some": [ "nesting", "id" ]
    }],
    "@typescript-eslint/quotes": 0,
    "react/require-default-props": 0,
  },
  "overrides": [],
  "ignorePatterns": ['.eslintrc.js', 'node_modules/**', 'legacy/**', "tailwind.config.js"]
};
