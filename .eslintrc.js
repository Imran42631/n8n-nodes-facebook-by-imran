module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
    },
    ignorePatterns: ['dist/**', 'node_modules/**', 'gulpfile.js', 'package.json'],
    extends: ['plugin:n8n-nodes-base/community'],
    rules: {
        'n8n-nodes-base/node-param-display-name-miscased': 'error',
    },
};
