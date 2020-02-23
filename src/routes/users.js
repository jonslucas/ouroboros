import { Router } from 'express';
import User from '../models/User';
import { authenticate, genHash } from '../utils/userAuth';

const router = Router();

/* GET users listing. */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  } 
  
});

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

router.get('/:id', authenticate, getUser, async (req, res) => {

});
router.patch('/:id', authenticate, getUser, async (req, res) => {

});
router.delete('/:id', authenticate, getUser, async (req, res) => {

});

export default router;
