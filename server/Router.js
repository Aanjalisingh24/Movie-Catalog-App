const router = require('express').Router();
const authController = require('./controllers/auth_Controller');
const db = require('./db');
const verifyToken = require('./controllers/authMiddleware');

router.post('/signup', authController.Signup);
router.post('/login', authController.Login);

router.get('/me', verifyToken, (req, res) => {
  return res.json({ loggedIn: true, user: req.user });
});


// fatching favorites from authenticated user
router.get('/favorites/:userId', verifyToken, async (req, res) => {
  const userId = req.params.userId;
  if (parseInt(userId) !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  try {
    const [rows] = await db.execute(
      'SELECT movie_title, release_year FROM favorites WHERE user_id = ?', 
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Get favorites error:', err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// saving and removing  favorites from database
router.post('/favorites', verifyToken, async (req, res) => {
  const { title, release_year } = req.body;
  const user_id = req.user.id;

  if (!title || !release_year) {
    return res.status(400).json({ error: 'Missing title or release_year' });
  }
  try {
    const [exists] = await db.execute(
      'SELECT * FROM favorites WHERE user_id = ? AND movie_title = ? AND release_year = ?',
      [user_id, title, release_year]
    );
    if (exists.length > 0) {
      await db.execute(
        'DELETE FROM favorites WHERE user_id = ? AND movie_title = ? AND release_year = ?',
        [user_id, title, release_year]
      );
      return res.json({ status: 'removed' });
    }
    await db.execute(
      'INSERT INTO favorites (user_id, movie_title, release_year) VALUES (?, ?, ?)',
      [user_id, title, release_year]
    );
    res.json({ status: 'added' });
  } catch (err) {
    console.error('Toggle favorite error:', err);
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out' });
});

module.exports = router;
