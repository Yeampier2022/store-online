const styledComponentArrowFn =
  'TaggedTemplateExpression > TemplateLiteral > ArrowFunctionExpression';

const ignoredNodes = [
  styledComponentArrowFn,
  `${styledComponentArrowFn} > BlockStatement`,
];

module.exports = {
  rules: {
    'indent': ['error', 2, {
      ignoredNodes,
    }],
  }
}