
import result from '../__fixtures__/result'
import showDiff from '../src'

test('showdiff',() =>{
    expect(showDiff('file1.json', 'file2.json')).toBe(result)
})