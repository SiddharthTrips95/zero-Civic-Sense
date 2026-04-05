import { Router } from 'express';
import { Official } from '../models/Official.js';

const router = Router();

// Get all officials
router.get('/', async (req, res) => {
  try {
    const officials = await Official.find();
    res.json(officials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching officials' });
  }
});

// Get single official
router.get('/:id', async (req, res) => {
  try {
    const official = await Official.findById(req.params.id);
    if (!official) {
      return res.status(404).json({ message: 'Official not found' });
    }
    res.json(official);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching official' });
  }
});

export default router;
