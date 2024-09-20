const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store user data
let users = [];

// GET endpoint to fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST endpoint to add a new user
app.post('/', (req, res) => {
  const data = req.body;
  const newUser = {
    id: users.length + 1,
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    email: data.email
  };
  users.push(newUser);
  res.status(201).json({ message: 'user created successfully', newUser});
})

// PUT endpoint to update a user by index (replaces the whole object)
app.put('/users/:index', (req, res) => {
    const index = req.params.index;
    if (index >= users.length || index < 0) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { firstName, lastName, age, email } = req.body;
    if (!firstName || !lastName || !age || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const updatedUser = { firstName, lastName, age, email };
    users[index] = updatedUser;
    res.json(updatedUser);
});

// PATCH endpoint to partially update a user by index
app.patch('/users/:index', (req, res) => {
    const index = req.params.index;
    if (index >= users.length || index < 0) {
        return res.status(404).json({ error: 'User not found' });
    }
    const userToUpdate = users[index];
    const { firstName, lastName, age, email } = req.body;

    if (firstName !== undefined) userToUpdate.firstName = firstName;
    if (lastName !== undefined) userToUpdate.lastName = lastName;
    if (age !== undefined) userToUpdate.age = age;
    if (email !== undefined) userToUpdate.email = email;

    res.json(userToUpdate);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});