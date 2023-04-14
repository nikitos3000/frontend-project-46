import { test, expect } from '@jest/globals';
import { result, result2, result3 } from '../__fixtures__/result.js';
import showDiff from '../src/index.js';

test('json', () => {
  expect(showDiff('file1.json', 'file2.json', 'stylish')).toBe(result);
});
test('yaml', () => {
  expect(showDiff('file1.yaml', 'file2.yaml', 'stylish')).toBe(result);
});
test('yml', () => {
  expect(showDiff('file1.yml', 'file2.yml', 'stylish')).toBe(result);
});

test('jsonPlain', () => {
  expect(showDiff('file1.json', 'file2.json', 'plain')).toBe(result2);
});
test('yamlPlain', () => {
  expect(showDiff('file1.yaml', 'file2.yaml', 'plain')).toBe(result2);
});
test('ymlPlain', () => {
  expect(showDiff('file1.yml', 'file2.yml', 'plain')).toBe(result2);
});

test('jsonjson', () => {
  expect(showDiff('file1.json', 'file2.json', 'json')).toBe(result3);
});
test('yamljson', () => {
  expect(showDiff('file1.yaml', 'file2.yaml', 'json')).toBe(result3);
});
test('ymljson', () => {
  expect(showDiff('file1.yml', 'file2.yml', 'json')).toBe(result3);
});
