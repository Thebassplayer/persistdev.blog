import nextVitals from "eslint-config-next/core-web-vitals";
import testingLibrary from "eslint-plugin-testing-library";
import prettier from "eslint-config-prettier";

const config = [
  {
    ignores: [
      ".next/**",
      ".contentlayer/**",
      "coverage/**",
      "generated/**",
      "node_modules/**",
    ],
  },
  ...nextVitals,
  testingLibrary.configs["flat/react"],
  {
    rules: prettier.rules,
  },
  {
    rules: {
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            {
              char: "'",
              alternative: "&apos;",
            },
            {
              char: '"',
              alternative: "&quot;",
            },
          ],
        },
      ],
    },
  },
];

export default config;
