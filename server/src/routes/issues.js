import { Router } from 'express';
import { Issue } from '../models/Issue.js';

const router = Router();

// Get all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues' });
  }
});

// Get single issue
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issue' });
  }
});

// Create issue
router.post('/', async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).json({ message: 'Error creating issue' });
  }
});

export default router;
