import model from "./model.js";
export function createUsers(user) {
  if (!user.oldId) {
    user.oldId = `USER-${Date.now()}`; // Example: Generate unique oldId
  }
delete user._id;

return model.create(user);

}
export const findUserByOldId = async (oldId) => {
  console.log("Querying user with oldId:", oldId);
  return model.findOne({ oldId: oldId }); // Query the `users` collection
};

export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findUsersByRole = (role) => model.find({ role: role });
export const findUserByUsername = (username) =>
  model.findOne({ username: username });


export const findUserByCredentials = async (username, password) => {
  console.log("Querying user by:", {username, password}); // Log the query
  const user = await model.findOne({username, password}); // Query MongoDB
  console.log("User found:", user);
  return user;
};

// export const updateUser = (userId, updatedUserData) => {
//   users = users.map((u) =>
//     u._id === userId ? { ...u, ...updatedUserData } : u
//   );
//   return users.find((u) => u._id === userId); // Return the updated user
// };
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
// export const deleteUser = (userId) => {
//   users = users.filter((u) => u._id !== userId);
//   return { success: true };
// };
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
