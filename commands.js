#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer'); 
const actions = require ('./actions');

const commands = ['add', 'a', 'find', 'f', 'update', 'u', 'remove', 'r', 'list', 'l'];
const questions = [
  {
    type: 'input',
    name: 'firstName',
    message: 'Customer First Name'
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Customer Last Name'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Customer Phone Number'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customer Email Address'
  }
];

program
  .command('add')
  .alias('a')
  .description('Add a new customer')
  .action(() => {
    prompt(questions)
      .then(answers => actions.add(answers));
  });
  
program
  .command('find <name>')
  .alias('f')
  .description('Find a customer')
  .action(name => actions.find(name));

program
  .command('update <_id>')
  .alias('u')
  .description('Update a customer')
  .action(_id => {
    prompt(questions)
      .then(answers => actions.update(_id, answers));
  });

program
  .command('remove <_id>')
  .alias('r')
  .description('Remove a customer')
  .action(_id => actions.remove(_id));

program
  .command('list')
  .alias('l')
  .description('List all customers')
  .action(() => actions.list());

program
  .version('0.0.1')
  .description('Client Management System')
  .parse(process.argv);

if (!process.argv[2]) {
  program.help();
}
else if (commands.indexOf(process.argv[2]) < 0) {
  const closestCommands = commands.filter(command => {
    if (process.argv[2].includes(command)) {
      return command;
    }
  });

  if (!closestCommands.length) {
    console.info(`${process.argv[2]} is not a customer-cli command. See 'customer-cli --help for the list of commands.`);
    process.exit(1);
  }
  else {
    if (closestCommands.length > 1) {
      console.info('Did you mean one of these?', closestCommands.join(' | '));
    }
    else {
      console.info('Did you mean this?', closestCommands[0]);
    }
    process.exit(1);
  }
}