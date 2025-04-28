const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Home - Show all items
router.get('/', async (req, res) => {
  const items = await Item.find().sort({ addedAt: -1 });
  res.render('index', { items });
});

// Add item form
router.get('/add', (req, res) => {
  res.render('add');
});

// Add item POST
router.post('/add', async (req, res) => {
  const { name, quantity, category } = req.body;
  await Item.create({ name, quantity, category });
  res.redirect('/');
});

// Edit item form
router.get('/edit/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('edit', { item });
});
// Edit item POST
router.post('/edit/:id', async (req, res) => {
  const { name, quantity, category } = req.body;
  await Item.findByIdAndUpdate(req.params.id, { name, quantity, category });
  res.redirect('/');
});

// Delete item
router.get('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
