import { Router } from 'express';

const router = Router();

router.get('/coffee', (req, res) => {
  res.json({ message: 'I\'m a little teapot.' });
});

export default router;
