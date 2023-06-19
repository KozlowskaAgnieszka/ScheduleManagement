const data = require('../database/data');
const users = data['users'];

const express = require('express');

const router = express.Router();

router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params['userId'], 10);
  const noSuchUser =
    userId > users.length - 1 || userId < 0 || Number.isNaN(userId);
  if (noSuchUser) {
    return res.status(404).render(`404`, {
      message: `There is no user with id ${userId}`,
      pageTitle: 'Page not found',
      path: '',
    });
  }

  const user = users[userId];
  res.render('singleUser', {
    pageTitle: 'User Details',
    path: '/:userId',
    userId: userId,
    firstname: user['firstname'],
    lastname: user['lastname'],
    email: user['email'],
  });
});

router.get('/:userId/schedules', (req, res) => {
  const userId = parseInt(req.params['userId'], 10);
  const noSuchUser =
    userId > data.users.length - 1 || userId < 0 || Number.isNaN(userId);
  if (noSuchUser) {
    return res.status(404).render(`404`, {
      message: `There is no user with id ${userId}`,
      pageTitle: 'Page not found',
      path: '',
    });
  }

  const userSchedules = data.schedules.filter(
    (schedule) => schedule.user_id === userId
  );

  if (userSchedules.length === 0) {
    return res.status(404).render('404', {
      message: `There is no schedule for user with id ${userId}`,
      pageTitle: 'Page not found',
      path: '',
    });
  }

  res.render('singleUserSchedule', {
    pageTitle: 'User Schedule',
    path: '/:userId/schedules',
    user: users[userId],
    userId: userId,
    schedules: userSchedules,
  });
});

module.exports = router;
