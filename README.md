# eslint-plugin-arrow-body-parens

Rule to require parenthesis in arrow function body expressions.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-arrow-body-parens`:

```
$ npm install eslint-plugin-arrow-body-parens --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-arrow-body-parens` globally.

## Usage

Add `arrow-body-parens` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "arrow-body-parens"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "arrow-body-parens/parens": [ "error" ]
    }
}
```

## Supported Rules

* [parens](/docs/lib/rules/paren) - ensure arrow expression bodies are wrapped in parenthesis and that the opening parenthesis starts on the same line as the arrow.





