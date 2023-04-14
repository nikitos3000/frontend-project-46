import path from 'node:path';
import parser from './parser.js';
import builtAST from './buildAst.js';
import formatter from './formatters/index.js';

export default function showDiff(filepath1, filepath2, format) {
  const genDiff = (obj1, obj2, formatt) => {
    const AST = builtAST(obj1, obj2);
    return formatter(AST, formatt);
  };

  const resolvePath = (filepath) => (filepath.includes('__fixtures__')
    ? path.resolve(process.cwd(), filepath)
    : path.resolve(process.cwd(), (`__fixtures__/${filepath}`)));
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const data1 = parser(path1);
  const data2 = parser(path2);

  const vvv = genDiff(data1, data2, format);
  return vvv;
}
