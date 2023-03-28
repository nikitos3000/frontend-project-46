import  path  from 'node:path' ;
import yaml from 'js-yaml'
import { readFileSync } from 'node:fs';


const getFormat = (filename) => path.extname(filename);
const getFileName = (filename) => path.basename(filename);
const parser = (filename) =>{
    const name = getFileName(filename);
    const format = getFormat(name);
    return format !== '.json' ? yaml.load(readFileSync(filename, 'utf-8'))
    : JSON.parse(readFileSync(filename, 'utf-8'));
}

export default parser;
