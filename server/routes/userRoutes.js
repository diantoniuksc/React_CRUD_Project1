const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/*router.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log('IT GOT THE REQUEST');

  const user = await User.findById(id);
  res.json(user);
  console.log('IT WORKS');
});*/

// Add a user
router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Update a user
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, lastName, city, country, thoughts } = req.body;
  try {
       // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, lastName, city, country, thoughts },
      { new: true }
    );

    // Send the updated user back
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Error saving user data', error: error.message });
  }
});


// Delete a user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

router.post('/login', async (req, res) => {
  const { name, pass } = req.body;
  try {
    const user = await User.findOne({ name, pass });
    if (user) {
      res.json({ success: true, city: user.city, name: user.name });
    } else {
//      res.status(401).json({ success: false, message: 'Invalid credentials' });
	res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;