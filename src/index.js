
import _ from 'lodash';
import  path  from 'node:path' ;
import parser from './parser.js';
export default function showDiff(filepath1, filepath2){
    const path1 = resolvePath(filepath1)
    const path2 = resolvePath(filepath2)

    const data1 = parser(path1)
    const data2 = parser(path2)
    
    let vvv = genDiff(data1, data2)
     return vvv
}

function resolvePath (filepath){
 return filepath.includes('__fixtures__')
  ? path.resolve(process.cwd(), filepath)
  : path.resolve(process.cwd(), (`__fixtures__/${filepath}`))
}

const genDiff = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = _.union(keys1, keys2); 
    const sortedkeys = keys.sort()
    const result = ['{'];
    for (const key of sortedkeys) {
      if (!Object.hasOwn(obj1, key)) {
        result.push(`  + ${key}: ${obj2[key]}`)
      } else if (!Object.hasOwn(obj2, key)) {
        result.push(`  - ${key}: ${obj1[key]}`)
      } else if (obj1[key] !== obj2[key]) {
        result.push(`  - ${key}: ${obj1[key]}`)
        result.push(`  + ${key}: ${obj2[key]}`)
      } else {
        result.push(`    ${key}: ${obj1[key]}`)
      }
    }
    result.push('}')
    return result.join('\n')
  };
  