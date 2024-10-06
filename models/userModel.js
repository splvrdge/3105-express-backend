const fs = require("fs");
const path = require("path");

const users = path.join(__dirname, "../data/users.json");

const fetchUsers = () => {
  const dataBuffer = fs.readFileSync(users);
  const dataJSON = dataBuffer.toString();
  return JSON.parse(dataJSON);
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync(users, dataJSON);
};

module.exports = {
  fetchUsers,
  saveUsers,
};
