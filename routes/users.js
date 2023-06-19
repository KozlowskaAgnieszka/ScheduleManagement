const crypto = require('crypto');
const data = require('../database/data');
const users = data['users'];

const express = require('express');

const router = express.Router();

router.get('', (_, res) => {
  res.render('users',{
    pageTitle: "Users",
    path: '/users',
    users: users,
  })
});

router.post('/new', (req, res) => {
  const newUser = req.body;
  newUser.password = crypto
    .createHash('sha256')
    .update(newUser.password)
    .digest('hex');
    newUser.user_id = users.length;
    data.users.push(newUser);
  res.redirect('/users');
});

router.get('/new', (_, res) => {
  res.render('newUser', {
    pageTitle: 'Add new user',
    path: '/users/new'
  })
});



module.exports = router;
