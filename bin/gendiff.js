import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version        output the version number')
  .helpOption('-h, --help           output usage information')
  .option('-f, --format <type>  output format')
program.parse();