const fs = require('fs');
const readline = require('readline');

const loadData = (filename) => JSON.parse(fs.readFileSync(filename, 'utf-8'));

const users = loadData('users.json');
const tickets = loadData('tickets.json');
const organizations = loadData('organizations.json');

const printResults = (results) => {
  if (results.length === 0) {
    console.log('No results found');
  } else {
    results.forEach((result) => console.log(result));
  }
};

const search = (data, field, value) => data.filter((item) => item[field] === value);

// Searchable fields
const searchableFields = {
  users: Object.keys(users[0]),
  tickets: Object.keys(tickets[0]),
  organizations: Object.keys(organizations[0]),
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const searchOptions = () => {
  console.log('Type \'quit\' to exit at any time, Press "Enter" to continue');
  console.log('Select search options:');
  console.log('Press 1 to search');
  console.log('Press 2 to view a list of searchable fields\n');
};

const selectData = async () => {
  return new Promise((resolve) => {
    rl.question('Select 1) Users or 2) Tickets or 3) Organizations\n', (answer) => {
      resolve(answer);
    });
  });
};

const enterSearchTerm = async () => {
  return new Promise((resolve) => {
    rl.question('Enter search term\n', (answer) => {
      resolve(answer);
    });
  });
};

const enterSearchValue = async () => {
  return new Promise((resolve) => {
    rl.question('Enter search value\n', (answer) => {
      resolve(answer);
    });
  });
};

const main = async () => {
  let userInput = '';
  while (userInput !== 'quit') {
    searchOptions();
    userInput = await selectData();

    if (userInput === '1' || userInput === '2' || userInput === '3') {
      const dataChoice = userInput;
      const searchTerm = await enterSearchTerm();
      const searchValue = await enterSearchValue();

      console.log(`Searching ${dataChoice} for ${searchTerm} with a value of ${searchValue}`);

      const results = search(
        dataChoice === '1' ? users : dataChoice === '2' ? tickets : organizations,
        searchTerm,
        searchValue
      );

      printResults(results);
    } else if (userInput === '2') {
      const dataChoice = await selectData();
      const fields = searchableFields[dataChoice];
      console.log(`List of Searchable: ${fields.join(', ')}\n`);
    } else {
      console.log('Invalid choice');
    }
  }

  rl.close();
};

main();