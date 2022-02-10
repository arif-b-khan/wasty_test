/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./data/mockData");

const { books, authors, todos } = mockData;
populateTodos(todos);
const data = JSON.stringify({ books, authors, todos });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});

function populateTodos(todos) {
  for (let i = 4; i <= 20; i++) {
    todos.push({
      id: i,
      name: `Task ${i}`,
      isFav: true
    });
  }
}