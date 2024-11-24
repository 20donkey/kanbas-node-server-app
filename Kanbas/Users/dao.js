import db from "../Database/index.js";
let { users } = db;

export const createUser = (user) => {
  const newUser = { ...user, _id: Date.now().toString() };
  users = [...users, newUser];
  return newUser;
};

export const findAllUsers = () => users;

export const findUserById = (userId) => users.find((user) => user._id === userId);

export const findUserByUsername = (username) =>
  users.find((user) => user.username === username);

export const findUserByCredentials = (username, password) =>
  users.find((user) => user.username === username && user.password === password);

export const updateUser = (userId, updatedUserData) => {
  users = users.map((u) =>
    u._id === userId ? { ...u, ...updatedUserData } : u
  );
  return users.find((u) => u._id === userId); // Return the updated user
};

export const deleteUser = (userId) => {
  users = users.filter((u) => u._id !== userId);
  return { success: true };
};
