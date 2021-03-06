import { Router } from 'express';
import { authenticate } from '../utils/userAuth';
import Board from '../models/Boards';

const router = Router();

// Get Board from ID middlewear
const getBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      res.status(404).json({ message: 'Board Not Found' });
    }
    res.board = board;
  } catch (e) {
    res.status(500).json({ message: 'Invalid request' });
  }

  next();
}

router.get('/:id', authenticate, getBoard, (req, res) => res.json(res.board));

router.post('/', authenticate, (req, res) => {
  const { title } = req.body;

  const b = new Board({
    title,
    columns: []
  });
  try {
    const board = b.save();
    res.status(201).json(board);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
