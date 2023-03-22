import _ from 'lodash';
import { readFileSync } from 'node:fs' ;
import  path  from 'node:path' ;
export default function jsonToObj(filepath1, filepath2){
    const path1 = path.resolve('__fixtures__', filepath1)
    const path2 = path.resolve('__fixtures__', filepath2)
    const data1 = readFileSync(path1,{encoding: 'utf-8'})
    const data2 = readFileSync(path2,{encoding: 'utf-8'})
    const parseddata1 = JSON.parse(data1)
    const parseddata2 = JSON.parse(data2)
    console.log(path.resolve(filepath1))
    const vvv = genDiff(parseddata1, parseddata2)
    console.log(vvv)
}

const genDiff = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = _.union(keys1, keys2); 
    const sortedkeys = keys.sort()
    const result = ['{'];
    for (const key of sortedkeys) {
      if (!Object.hasOwn(obj1, key)) {
        result.push(` + ${key} : ${obj2[key]}`)
      } else if (!Object.hasOwn(obj2, key)) {
        result.push(` - ${key} : ${obj1[key]}`)
      } else if (obj1[key] !== obj2[key]) {
        result.push(` - ${key} : ${obj1[key]}`)
        result.push(` + ${key} : ${obj2[key]}`)
      } else {
        result.push(`   ${key} : ${obj1[key]}`)
      }
    }
    result.push('}')
    return result.join('\n')
  };
  