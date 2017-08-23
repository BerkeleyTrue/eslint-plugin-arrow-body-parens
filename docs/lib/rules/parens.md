# Require parenthesis in arrow function expression body (parens)

Arrow functions have two syntactic forms for their function bodies.  They may be defined with a *block* body (denoted by curly braces) `() => { ... }` or with a single expression `() => ...`, whose value is implicitly returned.

## Rule Details

This rule can enforce the use of parenthesis around arrow function body expressions that span multiple lines and that the opening parenthesis starts on the same line as the arrow token.

### always

Examples of **incorrect** code for this rule:

```js
/*eslint arrow-body-style: ["error", "always"]*/
/*eslint-env es6*/
var foo = () =>
  bar
	.baz();
;

var foo = (
  x,
  y
) =>
  foo
    .bar;
    
var foo = () =>
  (foo
    .bar);

var foo = () =>
  (foo
    .bar
);
const Comp = () =>
  (<div>
    <h1>foo</h1>
  </div>);

```

Examples of **correct** code for this rule:

```js
let foo = () => (
  true == false ||
  true != false
);

const Comp = () => (
  <div>
    <h1>foo</h1>
  </div>
);

var foo = (
  x,
  y
) => (
  foo
    .bar
);
```
