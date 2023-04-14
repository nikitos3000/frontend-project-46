import _ from 'lodash';

const spaceCount = 4;

const root2 = (node, path) =>{
if(path !== '') {
    return `${path}.${node.key}` ;
}
 return String(node.key)
}

const stringify = (node) => {
  if (_.isObject(node) && node !== null ) {
    return `[complex value]`;
  }
  if (_.isString(node)) {
    return `'${node}'`;
  }return String(node)
};

export default function makePlain(tree) {
  const getPlain = (node, path) => node.filter((n) => n.type !== 'unchanged').map((node)=>{
    const currentPatch = root2(node, path);
    switch (node.type) {
        case 'added':
          return `Property '${currentPatch}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${currentPatch}' was removed`;
        case 'nested': 
           return getPlain(node.children, currentPatch).join('\n');
        case 'changed':
          return `Property '${currentPatch}' was updated. From ${stringify(node.values[0])} to ${stringify(node.values[1])}`;
        default:
          throw new Error(`Unknown type of node '${node.type}'.`);
      }


  }) 
  const result = getPlain(tree, '');
  return result.join('\n');
}
