'use strict';
const config = {
    env: {
        browser: false,
        node: true,
        es6: true
    },
    globals: {
        console: false,
        exports: false,
        module: false,
        require: false,
        process: false
    },
    rules: {
        'comma-dangle': 1,
        'no-cond-assign': 1,
        'no-debugger': 2,
        'no-dupe-args': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-extra-semi': 2,
        'block-scoped-var': 2,
        'no-bitwise': 0,
        'curly': 2,
        'default-case': 1,
        'camelcase': 0,
        'eqeqeq': 0,
        'no-use-before-define': 2,
        'no-labels': 2,
        'no-new-wrappers': 2,
        'no-octal-escape': 2,
        'no-magic-numbers': 0,
        'radix': 0,
        'no-with': 2,
        'no-void': 2,
        'eol-last': 0,
        'no-undef': 2,
        'no-unused-vars': 1,
        'semi': 2,
        'quotes': [
            2,
            'single',
            'avoid-escape'
        ],
        'no-trailing-spaces': 2,
        'brace-style': [
            2,
            '1tbs'
        ],
        'strict': 0,
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true,
                overrides: {}
            }
        ],
        'space-infix-ops': 2,
        'no-loop-func': 1,
        'handle-callback-err': 1,
        'no-process-exit': 1,
        'no-lonely-if': 1,
        'no-redeclare': 2,

        'arrow-body-style': [
            1,
            'as-needed'
        ],
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'arrow-parens': [
            1,
            'always'
        ],
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true
            }
        ],
        'no-dupe-class-members': 2,
        'no-useless-computed-key': 2,
        'no-const-assign': 2,
        'no-class-assign': 2,
        'prefer-arrow-callback': 0,
        'prefer-const': 1,
        'prefer-template': 1,
        'template-curly-spacing': [
            1,
            'always'
        ]
    }
};

module.exports = config;
