const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");
let userIdCounter = 1;

const fetchUsers = () => {
  try {
    const dataBuffer = fs.readFileSync(usersPath);
    const dataJSON = dataBuffer.toString();
    const users = JSON.parse(dataJSON);
    userIdCounter =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    return users;
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    const dataJSON = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersPath, dataJSON);
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

const getNextUserId = () => {
  return userIdCounter++;
};

module.exports = {
  fetchUsers,
  saveUsers,
  getNextUserId,
};
