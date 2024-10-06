const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");

const fetchUsers = () => {
  try {
    const dataBuffer = fs.readFileSync(usersPath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
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

module.exports = {
  fetchUsers,
  saveUsers,
};
