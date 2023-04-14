import _ from "lodash";

const stringify = (node, depth) => {
    if (!_.isPlainObject(node) || (node === null)) {
        return `${node}`;
    }
    const keys = Object.keys(node);
    const lines = keys.map((prop) => ` ${` `.repeat(depth)} ${prop}: ${stringify(node[prop])}`)
    return ['{', ...lines, '}'].join('\n');
};

export default function makeStylish(tree) {
    function getStrings(node) {
        switch (node.type) {
                    case 'root': {
                return node.children.flatMap((child) => getStrings(child))
                    }
                    case 'added':
                return `  + ${node.key} : ${stringify(node.value)}`;
                    case 'deleted':
                return `  - ${node.key} : ${stringify(node.value)}`
                    case 'unchanged':
                        return `    ${node.key} : ${stringify(node.value)}`;
                    case 'nested': {
                        return `    ${node.key} : {\n${node.children.map((child) => getStrings(child)).join('\n')}\n}`
                    }
                    case 'changed':
                        return `  -   ${node.key} : ${node.values[0]}\n  + ${node.key}: ${stringify(node.values[1])}`
                    default:
                        throw new Error(`ошибка ${node}`)
                }

    }
    const result = getStrings(tree)
    return `{\n${result.join('\n')}\n}`
}