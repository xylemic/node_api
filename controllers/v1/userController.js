const express = require('express');
const { type } = require('os');

let users = []; // simulating db

// @desc POST create a new user
// @route POST /v1/users
// @access Public

const createUserHandler = async (req, res) => {
  console.log('POST request body:', JSON.stringify(req.body, null, 2));
  try {

     const { firstName, lastName, age, gender, email } = req.body;
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      age,
      gender,
      email
  };

  if (!firstName ||!lastName ||!age ||!gender ||!email) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  if (typeof firstName !== 'string' && typeof lastName !== 'string') {
    return res.status(400).json({ msg: 'Invalid first name or last name' });
  }

  if (typeof age !== 'number' || age <= 0 || age > 70) {
    return res.status(400).json({ msg: 'Invalid age' });
  }

  if (typeof gender!=='string' && !['male', 'female' ].includes(gender.toLowerCase())) {
    return res.status(400).json({ msg: 'Invalid gender' });
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({ msg: 'Invalid email' });
  }

  users.push(newUser);
  console.log('Users after POST:', JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'user created successfully', newUser});
  return;
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

// @desc GET retrieves users
// @route GET /v1/users
// @access Public

const getUsersHandler = async (req, res) => {
  try {
    console.log('GET request');
    res.json(users);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

// @desc GET retrieves user by ID
// @route GET /v1/users/:id
// @access Public
const getUserByIdHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
  }
  res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

// @desc PUT updates user by ID
// @route PUT /v1/users/:id
// @access Public
const updateUserByIdHandler = async (req, res) => {
  try {
    console.log('PUT request body:', JSON.stringify(req.body, null, 2));
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== - 1) {
    // preserve the id and update other fields
    users[userIndex] = { ...users[userIndex], ...updatedUser, id };
    console.log('Updated user:', JSON.stringify(users[userIndex], null, 2));
    console.log('Users after PUT:', JSON.stringify(users, null, 2));
    res.status(200).json({ message: 'user updated successfully', updatedUser: users[userIndex] });
  } else {
    res.status(404).json({ message: 'user not found' });
  }
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

// @desc PATCH upates a particular user field by ID
// @route PATCH /v1/users/:id
// @access Public
const patchUserFieldByIdHandler = async (req, res) => {
  try {
    console.log('PATCH request body:', JSON.stringify(req.body, null, 2));
  const userId = parseInt(req.params.id);
  const updatedFields = req.body;

  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'user not found' });
  } else {
    users[userIndex] = { ...users[userIndex], ...updatedFields };
    console.log('Updated user:', JSON.stringify(users[userIndex], null, 2));
    console.log('Users after PATCH:', JSON.stringify(users, null, 2));
    res.status(200).json({ message: 'user updated successfully', updatedUser: users[userIndex] });
  }
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

// @desc DELETE removes a user by ID
// @route DELETE /v1/users/:id
// @access Public
const deleteUserByIdHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'user not found' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  console.log('Users after DELETE:', JSON.stringify(users, null, 2));
  res.status(200).json({ message: 'user deleted successfully', deletedUser });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

module.exports = {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  patchUserFieldByIdHandler,
  deleteUserByIdHandler
}
