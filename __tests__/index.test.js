
import result from '../__fixtures__/result'
import showDiff from '../src'

test('json',() =>{
    expect(showDiff('file1.json', 'file2.json', 'stylish')).toBe(result)
})
test('yaml',() =>{
    expect(showDiff('file1.yaml', 'file2.yaml', 'stylish')).toBe(result)
})
test('yml',() =>{
    expect(showDiff('file1.yml', 'file2.yml', 'stylish')).toBe(result)
})