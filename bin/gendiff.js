import { Command } from 'commander';
import showDiff from '../src/index.js';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version        output the version number')
  .helpOption('-h, --help           output usage information')
  .option('-f, --format <type>  output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action(showDiff)
program.parse();