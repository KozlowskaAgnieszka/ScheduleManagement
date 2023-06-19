const path = require('path');
const data = require('../database/data');
const schedules = data['schedules'];
const users = data['users'];

path.dirname(require.main.filename);

const express = require('express');

const router = express.Router();

let userName = '';
const userFullname = (schedule) => {
  for (let user of users) {
    const userId = users.indexOf(user);
    if (userId === schedule.user_id) {
      userName = `${user.firstname} ${user.lastname}`;
      return userName;
    }
  }
};

router.get('', (_, res) => {
  res.render('schedules', {
    pageTitle: 'Schedules',
    path: '/schedules',
    schedules: schedules,
    users: users,
    username: userFullname,
  });
});

router.post('/new', (req, res) => {
  const newSchedule = {};
  newSchedule.user_id = parseInt(req.body.user_id);
  newSchedule.day = parseInt(req.body.day);
  newSchedule.start_at = req.body.start_at.join('');
  newSchedule.end_at = req.body.end_at.join('');
  data.schedules.push(newSchedule);
  res.redirect('/schedules');
});

router.get('/new', (req, res) => {
  const usersList = [];
  for (let user of users) {
    const userId = users.indexOf(user);
    usersList.push([userId, `${user.firstname} ${user.lastname}`]);
  }

  res.render('newSchedule', {
    usersList: usersList,
    pageTitle: 'Add new schedule',
    path: '/schedules/new',
  });
});

module.exports = router;
