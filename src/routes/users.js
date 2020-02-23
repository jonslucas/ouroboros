import { Router } from 'express';
import User from '../models/User';
import { authenticate, genHash } from '../utils/userAuth';

const router = Router();

// Get list of Users
router.get('/', authenticate, async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  } 
  
});

// Create new User
router.post('/', async (req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName
  } = req.body;
  try {
    const hash = await genHash(password);
    
    const u = new User({
      username,
      pass: hash,
      firstName,
      lastName,
    });
    
    const newUser = await u.save();
    
    res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }

});

// Get User from ID middlewear
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      res.status(404).json({ message: 'User Not Found' });
    }
    
    res.user = user;

  } catch(e) {
    res.status(500).json({ message: e.message });
  }
  
  next();

}

// Get a particular User
router.get('/:id', authenticate, getUser, async (req, res) => {
  res.json(res.user);
});

// Get the boards for a particular User
router.get('/:id/boards', authenticate, getUser, async (req, res) => {
  res.json(res.user.boards);
});

// Update a User
router.patch('/:id', authenticate, getUser, async (req, res) => {

});

// Remove a User
router.delete('/:id', authenticate, getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User removed" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

});

export default router;
