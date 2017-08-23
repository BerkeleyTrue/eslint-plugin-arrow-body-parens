/**
 * @fileoverview Tests for arrow-body-style
 * @author Alberto Rodríguez
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'ava';
import avaRuleTester from '../../../ava-rule-tester.js';

const { rules: { parens: rule } } = require('../../../lib');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = avaRuleTester(test, { parserOptions: { ecmaVersion: 8 } });

ruleTester.run('arrow-expression-body-parens', rule, {
  valid: [
    'var foo = () => {};',
    'var foo = () => 0;',
    'var addToB = (a) => { b =  b + a };',
    'var foo = () => { /* do nothing */ };',
    'var foo = () => {\n /* do nothing */ \n};',
    'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
    'var foo = () => ({});',
    'var foo = () => bar();',
    'var foo = () => { bar(); };',
    'var foo = () => { b = a };',
    'var foo = () => { bar: 1 };',
    'var foo = () => { return 0; };',
    'var foo = () => { return bar(); };',
    'var foo = () => ({ foo: 0 });',
    'var foo = () => (\nbar()\n);',
    'var foo = () => ({foo: 1}).foo();',
    'var foo = () => {return {foo: 1}.foo()};',
    'var foo = () => ({foo: 1}.foo());',
    'var foo = () => [\n "foo",\n "bar",\n];',
    {
      code: `
        var foo = () => {
          return {
            bar: 1,
            baz: 2
          };
        };
      `,
    },
    {
      code: `
        var foo = () => ({
            bar: 1,
            baz: 2
          });
      `,
    },
  ],
  invalid: [
    {
      code: `
        var foo = () =>
          foo
            .bar;
      `,
      output: `
        var foo = () => (
          foo
            .bar
);
      `,
      errors: [ {
        line: 2,
        column: 22,
        type: 'ArrowFunctionExpression',
        message: rule.__errors.noParensFound,
      } ],
    },
    {
      code: `
        var foo = (
          x,
          y
        ) =>
          foo
            .bar;
      `,
      output: `
        var foo = (
          x,
          y
        ) => (
          foo
            .bar
);
      `,
      errors: [ {
        line: 5,
        column: 11,
        type: 'ArrowFunctionExpression',
        message: rule.__errors.noParensFound,
      } ],
    },
    {
      code: `
        var foo = () =>
          (foo
            .bar);
      `,
      output: `
        var foo = () => (
foo
            .bar
);
      `,
      errors: [ {
        line: 2,
        column: 22,
        type: 'ArrowFunctionExpression',
        message: rule.__errors.parensOnWrongLine,
      } ],
    },
  ],
});
