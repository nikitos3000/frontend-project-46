import _ from 'lodash';

const spaceCount = 4;

const root = (depth, space = 0) => {
  const indent = depth * spaceCount;
  return ' '.repeat(indent - space);
};

const stringify = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return `${node}`;
  }
  const keys = Object.keys(node);
  const lines = keys.map((prop) => `${root(depth + 1)}${prop}: ${stringify(node[prop], depth + 1)}`);
  return `{\n${lines.join('\n')}\n${root(depth)}}`;
};

export default function makeStylish(tree) {
  function getStrings(node, depth = 1) {
    return node.map((n) => {
      switch (n.type) {
        case 'added':
          return `${root(depth, 2)}+ ${n.key}: ${stringify(n.value, depth)}`;
        case 'deleted':
          return `${root(depth, 2)}- ${n.key}: ${stringify(n.value, depth)}`;
        case 'unchanged':
          return `${root(depth)}${n.key}: ${stringify(n.value, depth)}`;
        case 'nested': {
          return `${root(depth)}${n.key}: {\n${getStrings(n.children, depth + 1).join('\n')}\n${root(depth)}}`;
        }
        case 'changed':
          return `${root(depth, 2)}- ${n.key}: ${stringify(n.values[0], depth)}\n${root(depth, 2)}+ ${n.key}: ${stringify(n.values[1], depth)}`;
        default:
          throw new Error(`Error ${n.type}`);
      }
    });
  }
  const result = getStrings(tree);
  return `{\n${result.join('\n')}\n}`;
}
