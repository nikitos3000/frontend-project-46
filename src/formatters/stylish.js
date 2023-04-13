import  _  from "lodash";

function isObject(value) {
if(typeof value == 'object' && value){
    return true
}return false

}

const stringify = (node, depth) => {
    if (!_.isPlainObject(node)) {
      return `${node}`;
    }
    const keys = Object.keys(node);
    const lines = keys.map((prop) => `  ${` `.repeat(depth)} ${prop} : ${stringify(node[prop])}`)
    return [ '{', lines, '}'].join('\n');
  };

export default function makeStylish(tree) {
    function getStrings(node) {
        if (Array.isArray(node)) {
            
            return node.map((elem) => {
                switch (elem.type) {
                    case 'added':
                        return `  + ${elem.key}: ${stringify(elem.value)}`;
                    case 'deleted':
                        return `  - ${elem.key}: ${stringify(elem.value)} `
                    case 'unchanged':
                        return `    ${elem.key}: ${stringify(elem.value)}`;
                    case 'nested': {
                        return `    ${elem.key}: {\n${elem.children.map((child) => getStrings(child)).join('\n')}\n}`
                    }
                    case 'changed':
                        return `  - ${elem.key}: ${elem.values[0]}\n  + ${elem.key}: ${stringify(elem.values[1])}`
                    default:
                        throw new Error(`ошибка ${elem}`)
                }
            })
        }
         else {
            switch (node.type) {
                case 'added':
                    return `  + ${node.key}: ${stringify(node.value)}`;
                case 'deleted':
                    return `  - ${node.key}: ${isObject(node) ? getStrings(node) : stringify(node.value)}`
                case 'unchanged':
                    return `    ${node.key}: ${stringify(node.value)}`;
                case 'nested': {
                    return `    ${node.key}: {\n${node.children.map((child) => getStrings(child)).join('\n')}\n}`
                }
                case 'changed':
                    return `  - ${node.key}: ${node.values[0]}\n  + ${node.key}: ${stringify(node.values[1])}`
                default:
                    throw new Error(`ошибка ${node}`);

            }
        }
    }
    const result = getStrings(tree)
    return `{\n${result.join('\n')}\n}`
}
