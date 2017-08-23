/**
 * @fileoverview Rule to require parens in arrow function body expressions.
 * @author Berkeley Martinez
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require('eslint/lib/ast-utils.js');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = module.exports = {
  meta: {
    docs: {
      description:
        'require parens around multiline arrow function body expressions',
      category: 'ECMAScript 6',
      recommended: true,
    },

    schema: {},

    fixable: 'code',
  },

  __errors: {
    noParensFound: 'Unwrapped multiline arrow body expression',
    parensOnWrongLine: 'Opening parens must be on the same line as the arrow token',
  },
  __ignoredBodyTypes: [
    'ArrayExpression',
    'BlockStatement',
  ],

  create(context) {
    const sourceCode = context.getSourceCode();

    /**
    * Determines whether a arrow function body needs parens
    * @param {ASTNode} node The arrow function node.
    * @returns {void}
    */
    function validate(node) {
      const arrowBody = node.body;

      if (
        // ignore block statements
        rule.__ignoredBodyTypes.some(type => type === arrowBody.type) ||
        // ignore single line arrow functions
        node.loc.start.line === node.loc.end.line
      ) {
        return;
      }

      const tokenBefore = sourceCode.getTokenBefore(arrowBody);
      const tokenAfter = sourceCode.getTokenAfter(arrowBody);
      const arrowToken = astUtils.isArrowToken(tokenBefore) ?
        tokenBefore :
        sourceCode.getTokenBefore(tokenBefore);
      if (
        !astUtils.isOpeningParenToken(tokenBefore) ||
        !astUtils.isClosingParenToken(tokenAfter)
      ) {
        const isClosingParenToken = astUtils.isClosingParenToken(tokenAfter);
        context.report({
          node,
          loc: tokenBefore.loc.start,
          message: rule.__errors.noParensFound,
          fix(fixer) {
            const fixes = [];

            if (!astUtils.isOpeningParenToken(tokenBefore)) {
              fixes.push(fixer.insertTextAfter(tokenBefore, ' ('));
            }

            if (!isClosingParenToken) {
              fixes.push(fixer.insertTextBefore(tokenAfter, '\n)'));
            }

            return fixes;
          },
        });
        return;
      }

      const openingParens = tokenBefore;
      const closingParens = tokenAfter;
      if (
        astUtils.isArrowToken(arrowToken) &&
        arrowToken.loc.start.line !== openingParens.loc.start.line
      ) {
        context.report({
          node,
          loc: arrowToken.loc.start,
          message: rule.__errors.parensOnWrongLine,
          fix(fixer) {
            return [
              fixer.replaceTextRange(
                [
                  arrowToken.range[1],
                  openingParens.range[1],
                ],
                ' (\n',
              ),

              fixer.replaceTextRange(closingParens.range, '\n)'),
            ];
          },
        });

        return;
      }
    }

    return { 'ArrowFunctionExpression:exit': validate };
  },
};
