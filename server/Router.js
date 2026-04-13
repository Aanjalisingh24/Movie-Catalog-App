const router = require('express').Router();
const authController = require('./controllers/auth_Controller');
const verifyToken = require('./controllers/authMiddleware');
const Favorite = require('./models/favoriteModel');

router.post('/signup', authController.Signup);
router.post('/login', authController.Login);

router.get('/me', verifyToken, (req, res) => {
  return res.json({ loggedIn: true, user: req.user });
});

// fatching favorites from authenticated user
router.get('/favorites/:userId', verifyToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userId: req.user.id
    });

    res.status(200).json(favorites);

  } catch (err) {
    console.error('Get favorites error:', err);
    res.status(500).json({ error: 'Failed to fetch favorites' })
  }
});

// saving and removing  favorites from database

router.post('/favorites', verifyToken, async (req, res) => {
  const { title, release_year } = req.body;
  const userId = req.user.id;

  if (!title || !release_year) {
    return res.status(400).json({ error: 'Missing title or release_year' });
  }

  try {
    // ✅ Check if already exists
    const exists = await Favorite.findOne({
      userId,
      title,
      release_year
    });

    // 🔁 If exists → remove (toggle OFF)
    if (exists) {
      await Favorite.deleteOne({
        _id: exists._id
      });

      return res.json({ status: 'removed' });
    }

    // ➕ If not exists → add (toggle ON)
    await Favorite.create({
      userId,
      title,
      release_year
    });

    res.json({ status: 'added' });

  } catch (err) {
    console.error('Toggle favorite error:', err);
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
