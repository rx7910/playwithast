const babel = require('@babel/core');
const types = require('babel-types')

const code = `const sum=(a,b)=>a+b;`;

let visitor = {
  ArrowFunctionExpression(path) {
    let params = path.node.params;
    let blockStatement = types.blockStatement([
      types.returnStatement(types.binaryExpression(
        '+',
        types.identifier('a'),
        types.identifier('b'),
      ))
    ]);
    let func = types.functionExpression(null, params, blockStatement, false, false);
    path.replaceWith(func);
  }
}

let result = babel.transform(code,{
  plugins:[
    {
      visitor
    }
  ]
});

console.log(result);
console.log(result.code);
