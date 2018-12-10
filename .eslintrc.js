/**
 * bamazon-cli.
 *
 * The Coding Boot Camp at UNC Charlotte.
 * (c) 2018 Richard Cyrus <richard.cyrus@rcyrus.com>.
 */

module.exports = {
    'extends': 'standard',
    'rules': {
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': ['error', {
            'before': true,
            'after': true
        }],
        'block-spacing': 'error',
        'brace-style': ['error', '1tbs', {
            'allowSingleLine': true
        }],
        'comma-dangle': ['error', 'only-multiline'],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': 'error',
        'constructor-super': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        'eol-last': 'error',
        'eqeqeq': ['error', 'smart'],
        'for-direction': 'error',
        'func-call-spacing': 'error',
        'func-name-matching': 'error',
        'func-style': ['error', 'declaration', {
            'allowArrowFunctions': true
        }],
        'indent': ['error', 4, {
            'ArrayExpression': 'first',
            'CallExpression': {
                'arguments': 'first'
            },
            'FunctionDeclaration': {
                'parameters': 'first'
            },
            'FunctionExpression': {
                'parameters': 'first'
            },
            'MemberExpression': 'off',
            'ObjectExpression': 'first',
            'SwitchCase': 1,
        }],
        'key-spacing': ['error', {
            'mode': 'strict'
        }],
        'keyword-spacing': 'error',
        'linebreak-style': ['error', 'unix'],
        'max-len': ['error', {
            'code': 80,
            'ignorePattern': '^// Flags:',
            'ignoreRegExpLiterals': true,
            'ignoreUrls': true,
            'tabWidth': 4,
        }],
        'new-parens': 'error',
        'no-class-assign': 'error',
        'no-confusing-arrow': 'error',
        'no-const-assign': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty-character-class': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-parens': ['error', 'functions'],
        'no-extra-semi': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-lonely-if': 'error',
        'no-misleading-character-class': 'error',
        'no-mixed-requires': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multi-spaces': ['error', {
            'ignoreEOLComments': true
        }],
        'no-multiple-empty-lines': ['error', {
            'max': 2,
            'maxEOF': 0,
            'maxBOF': 0
        }],
        'no-new-require': 'error',
        'no-new-symbol': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-path-concat': 'error',
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-restricted-modules': ['error', 'sys'],
        'no-return-await': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-tabs': 'error',
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef': ['error', {
            'typeof': true
        }],
        'no-undef-init': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-labels': 'error',
        'no-unused-vars': ['error', {
            'args': 'none',
            'caughtErrors': 'all'
        }],
        'no-use-before-define': ['error', {
            'classes': true,
            'functions': false,
            'variables': false,
        }],
        'no-useless-call': 'error',
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-whitespace-before-property': 'error',
        'no-with': 'error',
        'object-curly-spacing': ['error', 'always'],
        'one-var': ['error', {
            'initialized': 'never'
        }],
        'one-var-declaration-per-line': 'error',
        'operator-linebreak': ['error', 'after'],
        'prefer-const': ['error', {
            'ignoreReadBeforeAssign': true
        }],
        'quotes': ['error', 'single', {
            'avoidEscape': true
        }],
        'quote-props': ['error', 'consistent'],
        'rest-spread-spacing': 'error',
        'semi': ['error', 'always'],
        'semi-spacing': 'error',
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always',
        }],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': ['error', 'always', {
            'block': { 'balanced': true },
            'exceptions': ['-']
        }],
        'strict': ['error', 'global'],
        'symbol-description': 'error',
        'template-curly-spacing': 'error',
        'unicode-bom': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': 'off',
    },
    'parserOptions': {
        'ecmaVersion': 10,
        'sourceType': 'module',
        'ecmaFeatures': {
            'impliedStrict': true
        }
    },
    'env': {
        'node': true,
        'es6': true
    }
};
