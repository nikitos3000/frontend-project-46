import _ from 'lodash';

function builtAST(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedkeys = _.sortBy(keys);

  const tree = sortedkeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        type: 'added',
        key,
        value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        type: 'deleted',
        key,
        value: obj1[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        children: builtAST(obj1[key], obj2[key]),
      };
    } if (obj1[key] === obj2[key]) {
      return {
        type: 'unchanged',
        key,
        value: obj1[key],
      };
    } return {
      type: 'changed',
      key,
      values: [obj1[key], obj2[key]],
    };
  });

  return tree;
}

const getDifferenceTree = (data1, data2) => builtAST(data1, data2);

export default getDifferenceTree;
